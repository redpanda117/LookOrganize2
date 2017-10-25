const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const financeSchema = new Schema({
  title: { type: String, required: true },
  cost: String,
  date: { type: Date, default: Date.now }
});

const Finance = mongoose.model("Finance", financeSchema);

module.exports = Finance;
