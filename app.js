// Importing express and bodyparser
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const homeRoute = require("./routes/tasks");

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

// Routing only
app.use("/register", authRoute);
app.use("/", authRoute); // Set the default route to the register route
app.use("/tasks", homeRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
