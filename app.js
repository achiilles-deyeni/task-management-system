require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const tasksRoute = require("./routes/tasks");
const { protect } = require("./middleware/authenticate");

const app = express();

// Database configuration
mongoose.connect("mongodb://127.0.0.1:27017/daily-tasks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});
db.on("error", (err) => {
  console.error("Something went wrong connecting to MongoDB", err);
});

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// Routing
app.use("/register", authRoute);
// app.use("/login", authRoute);
app.use("/", authRoute); // Ensure root uses authRoute
app.use("/", protect, tasksRoute); // Use protect for tasks routes

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
