const express = require("express");
const router = express.Router();

const Item = require("../models/item.js");

router.get("/", async (req, res) => {
  Item.find({})
    .then((allItems) => {
      res.json(allItems);
    })
    .catch((err) => res.json({ status: 400, err: err }));
});

module.exports = router;
