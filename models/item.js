const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  type: String,
  quantity: Number,
  loggedDate: Date,
  obtainedDate: Date,
  lastCheckedDate: Date,
});

const ItemModel = mongoose.model("Item", itemSchema);
module.exports = ItemModel;
