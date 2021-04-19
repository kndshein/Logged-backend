const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, default: "NC" },
  quantity: Number,
  loggedDate: { type: Date, default: Date.now },
  obtainedDate: Date,
  lastCheckedDate: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
