const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, default: "NC" },
  quantity: Number,
  loggedDate: { type: Date, default: Date.now },
  obtainedDate: Date,
  lastCheckedDate: { type: Date, default: Date.now },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
