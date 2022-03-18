const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
var rfs = require("rotating-file-stream");

// create a rotating write stream
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let corsOrigin = "*";

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
  app.use(morgan("dev"));
  corsOrigin = `http://localhost:${PORT}`;
} else if (process.env.NODE_ENV === "production") {
  app.use(morgan("common", { stream: accessLogStream }));
  corsOrigin = ["https://budbuddy.click", "http://budbuddy.click"];
}

const corsOptions = {
  origin: corsOrigin,
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("버드버디! 시작!");
});

//router
const controllers = require("./controllers");
app.post("/users/login", controllers.login);
app.post("/users/signup", controllers.signup);

app.listen(PORT, () => {
  console.log(`서버 시작 ${corsOrigin}`);
});

module.exports = app;
