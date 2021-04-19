const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdDate: { type: Date, default: Date.now },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
