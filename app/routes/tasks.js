const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authenticate");
const Tasks = require("../models/task");

router.get("/tasks", protect, async (req, res) => {
  try {
    const tasks = await Tasks.find({ user: req.user._id });
    if (req.headers.accept.includes("application/json")) {
      return res.json({ tasks });
    }
    res.render("index", { tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Route to create a task
router.post("/tasks", protect, (req, res, next) => {
  const { name } = req.body;
  const addTask = new Tasks({ name, user: req.user._id });
  addTask
    .save()
    .then(() => {
      console.log("Task added successfully");
      res.redirect("/tasks");
    })
    .catch((err) => {
      console.log("Task creation failed:", err.message);
      next(err);
    });
});

// Route to edit a task
router.get("/edit/:id", protect, (req, res, next) => {
  Tasks.findById(req.params.id)
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found");
      }
      res.render("edit", { task });
    })
    .catch((err) => {
      console.log("Could not retrieve task for edit:", err.message);
      next(err);
    });
});

router.post("/edit/:id", protect, (req, res, next) => {
  Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found");
      }
      console.log("Task updated successfully");
      res.redirect("/tasks");
    })
    .catch((err) => {
      console.log("Task update failed:", err.message);
      next(err);
    });
});

// Delete request
router.get("/delete/:id", protect, (req, res, next) => {
  Tasks.findByIdAndDelete(req.params.id)
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found");
      }
      console.log("Task deleted successfully");
      res.redirect("/tasks");
    })
    .catch((err) => {
      console.log("Task deletion failed:", err.message);
      next(err);
    });
});

module.exports = router;
