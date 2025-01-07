require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const tasksRoute = require("./routes/tasks");
const { protect } = require("./middleware/authenticate");
const cookieParser = require("cookie-parser");

const app = express();

// Database configuration
// mongoose.connect("mongodb://127.0.0.1:27017/daily-tasks", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });
// db.on("error", (err) => {
//   console.error("Something went wrong connecting to MongoDB", err);
// });

const mongoUrl = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "daily-tasks";

mongoose.connect(`${mongoUrl}/${dbName}`);
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
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());

// Routing
app.use("/register", authRoute);
app.use("/", authRoute); // Ensure root uses authRoute
app.use("/", protect, tasksRoute); // Use protect for tasks routes

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
