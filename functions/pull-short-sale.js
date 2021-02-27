const axios = require('axios');
const moment = require('moment');
const connectDb = require('./utils/connectDB');
const Meta = require('./models/Meta');
const ShortRecord = require('./models/ShortRecord');
const generateResponse = require('./utils/helper');
connectDb();

exports.handler = async function (event, context) {
  const shortTxt = await fetchData();
  const lineData = splitLine(shortTxt);
  const latestDateInTxt = extractDate(lineData);

  // check if date format in txt file is correct
  if (!latestDateInTxt.isValid())
    return generateResponse(
      400,
      'Date format of file is not correct, please check your parsing code.'
    );

  // check if short sale data need to be updated
  let meta = await Meta.findOne({});
  if (meta && meta.lastUpdate && latestDateInTxt <= meta.lastUpdate)
    return generateResponse(200, 'No data need to update.');

  const shortData = extractShortData(lineData);
  const shortRecords = generateShortObject(shortData, latestDateInTxt);

  // save shortData into DB
  await ShortRecord.insertMany(shortRecords, (errors, docs) => {
    if (errors) {
      console.log('ERRORS INSERTING SHORT DATA:', errors);
    }
  });

  //update lastUpdate in DB
  if (!meta) {
    meta = new Meta({
      lastUpdate: latestDateInTxt,
    });
  } else {
    meta.lastUpdate = latestDateInTxt;
  }
  await meta.save();

  return generateResponse(200, 'Short data updated.');
};

const splitLine = (txt) => {
  return txt.split('\r\n');
};

const extractDate = (lineData) => {
  return moment.utc(lineData[0].slice(37, 48), 'DD-MMM-YYYY');
};

const extractShortData = (lineData, skip = 8) => {
  return lineData.slice(8, -1);
};

const fetchData = async () => {
  const response = await axios.get('https://www.asx.com.au/data/shortsell.txt');
  return response.data;
};

const generateShortObject = (shortDataArray, latestDateInTxt) => {
  return shortDataArray.map((line) => {
    const code = line.slice(0, 8).trim();
    const desc = line.slice(8, 42).trim();
    const product = line.slice(42, 56).trim();
    const shortSale = parseInt(line.slice(56, 70).trim().split(',').join(''));
    const capital = parseInt(line.slice(70, 90).trim().split(',').join(''));
    const percentage = Number.parseFloat(line.slice(90).trim());

    return new ShortRecord({
      code,
      desc,
      product,
      shortSale,
      capital,
      percentage,
      shortDate: latestDateInTxt,
    });
  });
};
