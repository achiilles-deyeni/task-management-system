// importing express and bodyparser
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const homeRoute = require("./routes/tasks");

const app = express();

// database configuration
mongoose.connect("mongodb://127.0.0.1:27017/daily-tasks");
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});
db.on("error", () => {
  console.log("Something went wrong connecting to MongoDB");
});

// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ urlencoded: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// routing only
app.use("/register", authRoute);
app.use("/", homeRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
