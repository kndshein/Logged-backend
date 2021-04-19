const express = require("express");
const router = express.Router();

const Item = require("../models/item.js");
const verifyToken = require("./verifyToken.js");

//* Find all items
// router.get("/", verifyToken, async (req, res) => {
//   Item.find({})
//     .then((allItems) => {
//       res.json(allItems);
//     })
//     .catch((err) => res.json({ status: 400, err: err }));
// });

//* Find a single item by ID
// Checks if item user matches user
router.get("/id/:id", verifyToken, async (req, res) => {
  const userId = req.user._id;
  Item.findById(req.params.id)
    .then((item) => {
      if (item.user == userId) {
        res.send(item);
      } else {
        res.send("Item doesn't match user");
      }
    })
    .catch((err) => res.send({ status: 400, err: err }));
});

//* Update a single item by ID
// Checks if item user matches user before updating
router.put("/id/:id", verifyToken, async (req, res) => {
  const userId = req.user._id;
  Item.findById(req.params.id)
    .then((item) => {
      if (item.user == userId) {
        Item.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
          (item) => {
            res.send(item);
          }
        );
      } else {
        res.send("Item doesn't match user");
      }
    })
    .catch((err) => res.send({ status: 400, err: err }));
});

//* Delete a single item by ID
// Checks if item user matches user before updating
router.delete("/id/:id", verifyToken, async (req, res) => {
  const userId = req.user._id;
  Item.findById(req.params.id)
    .then((item) => {
      if (item.user == userId) {
        Item.findByIdAndDelete(req.params.id).then(() => {
          res.send("Successfully deleted");
        });
      } else {
        res.send("Item doesn't match user");
      }
    })
    .catch((err) => res.send({ status: 400, err: err }));
});

module.exports = router;
