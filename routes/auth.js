const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/users");

// registration routes

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = new User(name, email, password);
  await user
    .save()
    .then(() => {
      console.log("User registered successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("User registration failed");
      next(err);
    });
});

// login routes
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
