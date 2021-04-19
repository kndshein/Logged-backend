require("dotenv").config();

const mongoose = require("mongoose");
const DB = mongoose.connection;
const { MONGODBURI } = process.env;
const config = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose.connect(MONGODBURI, config);

DB.on("open", () => console.log("You are connected to Mongo"))
  .on("close", () => console.log("You are disconnected to Mongo"))
  .on("error", (err) => console.log(err));

module.exports = mongoose;
