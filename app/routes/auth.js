const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const tasks = require("../routes/tasks");
const User = require("../models/users");

// Registration routes
router.get("/", (req, res, next) => {
  res.render("register");
});

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ name, email, password });
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "strict",
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.json({
      success: true,
      message: "Login successful",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
