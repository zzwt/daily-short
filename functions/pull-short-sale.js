require("dotenv").config();
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const moment = require("moment");
const { connectDb, disconnectDb } = require("./utils/connectDB");
const Meta = require("./models/Meta");
const ShortRecord = require("./models/ShortRecord");
const generateResponse = require("./utils/helper");
const { convert } = require("html-to-text");

// Initialize DB connection
(async () => {
  await connectDb();
})();

exports.handler = async function (event, context) {
  const shortTxt = await fetchData();
  const lineData = splitLine(shortTxt);
  const latestDateInTxt = extractDate(lineData);

  // check if date format in txt file is correct
  if (!latestDateInTxt.isValid())
    return generateResponse(
      400,
      "Date format of file is not correct, please check your parsing code."
    );

  // check if short sale data need to be updated
  let meta = await Meta.findOne({});
  if (meta && meta.lastUpdate && latestDateInTxt <= meta.lastUpdate)
    return generateResponse(200, "No data need to update.");

  const shortData = extractShortData(lineData);
  const shortRecords = generateShortObject(shortData, latestDateInTxt);

  // save shortData into DB
  await ShortRecord.insertMany(shortRecords, (errors, docs) => {
    if (errors) {
      console.log("ERRORS INSERTING SHORT DATA:", errors);
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
  await disconnectDb();
  return generateResponse(200, "Short data updated.");
};

const splitLine = (txt) => {
  return txt.split("\r\n");
};

const extractDate = (lineData) => {
  return moment.utc(lineData[0].slice(37, 48), "DD-MMM-YYYY");
};

const extractShortData = (lineData, skip = 8) => {
  return lineData.slice(8, -1);
};

const updateExtensionAPIKey = async (page, url) => {
  // To get the extension id
  await page.goto("chrome://extensions/");
  await page.waitForSelector("extensions-manager");
  const pierceSelector = "pierce/extensions-item";
  const extensionItems = await page.$$eval(pierceSelector, (elements) =>
    elements.map((el) => el.id)
  );
  if (extensionItems.length === 0)
    return generateResponse(400, "Extension not found.");

  const extensionId = extensionItems[0];

  // update the extension options
  await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);
  await page.waitForSelector("input[type='text']");
  await page.type("input[type='text']", process.env.CAPTCHA_API_KEY);
  await page.click("button[type='submit']");
  await page.waitForNetworkIdle({ idleTime: 1000 });
};

const fetchData = async () => {
  const pathToExtension = `./Anti_Captcha_1.0.2.0`;

  const browser = await puppeteer.launch({
    headless: "chrome",
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      "--no-sandbox",
    ],
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH ||
      (await chromium.executablePath(
        "/var/task/node_modules/@sparticuz/chromium/bin"
      )),
  });
  const pages = await browser.pages();
  const page = pages[0] || (await browser.newPage());

  // Set user agent for the page, this is not needed actually
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
  );

  // Set default timeout
  page.setDefaultTimeout(60000);

  await updateExtensionAPIKey(page);

  // fet the data and solve captcha
  try {
    const url = "https://www.asx.com.au/data/shortsell.txt";
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    const content = convert(await page.content());

    return content;
  } catch (error) {
    console.log("Error fetching the data or captcha not solved:", error);
    return generateResponse(
      400,
      "Error fetching the data or captcha not solved."
    );
  } finally {
    await browser.close();
  }
};

const generateShortObject = (shortDataArray, latestDateInTxt) => {
  return shortDataArray.map((line) => {
    const code = line.slice(0, 8).trim();
    const desc = line.slice(8, 42).trim();
    const product = line.slice(42, 56).trim();
    const shortSale = parseInt(line.slice(56, 70).trim().split(",").join(""));
    const capital = parseInt(line.slice(70, 90).trim().split(",").join(""));
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

// Test for local testing purpose
// const main = async () => {
//   await connectDb();
//   try {
//     console.log("Starting to fetch short sale data...");
//     const data = await fetchData();
//     console.log("Data fetched successfully:");
//     console.log(data);
//     await disconnectDb();
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// (async () => {
//   await main();
// })();
