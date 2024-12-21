const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Tasks = require("../models/task");
const User = require("../models/users");

// USER AUTHENTICATION
// Route for registration of members

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ username, email, password });
    await user.save();
    console.log("User registered successfully");
    res.redirect("/");
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
    // If needed, you can generate a JWT here for authenticated users
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

// TASKS HANDLING

// Route to get all tasks
router.get("/", (req, res, next) => {
  Tasks.find({})
    .then((tasks) => {
      res.render("index", { tasks });
    })
    .catch((err) => {
      console.log("Something went wrong with the request");
      next(err);
    });
});

// Route to create a task
router.post("/tasks", (req, res, next) => {
  const { name } = req.body;
  const addTask = new Tasks({ name });
  addTask
    .save()
    .then(() => {
      console.log("Task added successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Task creation failed");
      next(err);
    });
});

// Route to edit a task
router.get("/edit/:id", (req, res, next) => {
  Tasks.findById(req.params.id)
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found");
      }
      res.render("edit", { task });
    })
    .catch((err) => {
      console.log("Could not retrieve task for edit");
      next(err);
    });
});

router.post("/edit/:id", (req, res, next) => {
  Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found");
      }
      console.log("Task updated successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Task update failed");
      next(err);
    });
});

// Delete request
router.get("/delete/:id", (req, res, next) => {
  Tasks.findByIdAndDelete(req.params.id)
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found");
      }
      console.log("Task deleted successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Task deletion failed");
      next(err);
    });
});

module.exports = router;
