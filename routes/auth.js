const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/task");

// Registration routes
router.get("/", (req, res, next) => {
  res.render("register");
});

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ username, email, password });
    await user.save();
    console.log("User registered successfully");
    res.redirect("/login");
  } catch (err) {
    console.log("User registration failed");
    next(err);
  }
});

// Login routes
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
