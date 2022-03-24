var express = require("express");
var router = express.Router();

const { users } = require("../controllers");

// POST /signup
router.post("/signup", users.signUp);

// POST /login
router.post("/login", users.login);

// GET /userInfo
router.get("/userinfo", users.userInfo);

module.exports = router;
