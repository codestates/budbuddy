require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();
const PORT = process.env.SERVERPORT || 80;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.REACT_APP_API_URL],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
  }),
);

app.get("/", (req, res) => {
  res.send("버드버디! 시작!");
});

console.log(process.env.REACT_APP_API_URL);

const controllers = require("./controllers");
app.post("/users/login", controllers.login);
app.post("/users/signup", controllers.signup);

app.listen(PORT, () => {
  console.log(`서버 시작 http://localhost:${PORT}`);
});

module.exports = app;
