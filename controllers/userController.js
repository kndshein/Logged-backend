const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { registerValidation, loginValidation } = require("../validation");

//* Register a User
router.post("/register", async (req, res) => {
  // Validates the information
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if Email exists in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    items: [],
  });
  try {
    const savedUser = await user.save();
    res.send("Account successfully created");
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
