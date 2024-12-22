const express = require("express");
const router = express.Router();
const Tasks = require("../models/task");
const { protect } = require("../middleware/authenticate");

// Route to get all tasks
router.get("/tasks", protect, (req, res, next) => {
  Tasks.find({ user: req.user._id })
    .then((tasks) => {
      res.render("index", { tasks });
    })
    .catch((err) => {
      console.log("Something went wrong with the request");
      next(err);
    });
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
      console.log("Task creation failed");
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
      console.log("Could not retrieve task for edit");
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
      console.log("Task update failed");
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
      console.log("Task deletion failed");
      next(err);
    });
});

module.exports = router;
