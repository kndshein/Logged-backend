const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Item = require("../models/item");

const { registerValidation, loginValidation } = require("../validation");
const verifyToken = require("./verifyToken");

//* Find a single user by ID (used to access items as well)
router.get("/profile", verifyToken, async (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .populate("items")
    .then((user) => {
      res.json({
        user: { username: user.username, email: user.email },
        items: user.items,
      });
    })
    .catch((err) => res.json({ status: 400, err: err }));
});

//* Add an item to specific user by ID
router.get("/item/create", verifyToken, async (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .populate("items")
    .then((user) => {
      Promise.all([
        Item.create({
          name: req.body.name,
          type: req.body.type,
          quantity: req.body.quantity,
          obtainedDate: req.body.obtainedDate,
          user: user._id,
        }).then((item) => {
          user.items.push(item);
        }),
      ])
        .then(() => {
          user.save();
        })
        .then(() => {
          res.json(user);
        });
    })
    .catch((error) => res.json({ status: 400, error: error }));
});

//* Register a User
router.post("/register", async (req, res) => {
  // Validates the information
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // Check if Email exists in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    items: [],
  });
  try {
    const savedUser = await user.save();
    res.send("User registration successful!");
  } catch (err) {
    res.status(400).send(err);
  }
});

//* Login a User
router.post("/login", async (req, res) => {
  // Validates the information
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check for Email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");

  // Check for Password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ error: "Password is incorrect" });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
