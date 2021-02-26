const mongoose = require('mongoose');

const { Date, String, Number } = mongoose.Schema.Types;
const ShortRecordSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    index: true,
  },
  desc: {
    type: String,
  },
  product: {
    type: String,
    required: true,
  },
  shortSale: {
    type: Number,
    required: true,
  },
  capital: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  shortDate: {
    type: Date,
    required: true,
    index: true,
    expireAfterSeconds: 31622400,
  },
});

module.exports =
  mongoose.models.ShortRecord ||
  mongoose.model('ShortRecord', ShortRecordSchema);
