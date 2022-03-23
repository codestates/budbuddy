var express = require("express");
var router = express.Router();

const { users } = require("../controllers");

// POST /signup
router.post("/signup", users.signup);

// POST /login
router.post("/login", users.login);

module.exports = router;
