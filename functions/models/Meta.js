const mongoose = require('mongoose');

const { Date } = mongoose.Schema.Types;
const MetaSchema = new mongoose.Schema({
  lastUpdate: {
    type: Date,
  },
});

module.exports = mongoose.models.Meta || mongoose.model('Meta', MetaSchema);
