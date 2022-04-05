var express = require("express");
var router = express.Router();

const { users } = require("../controllers");

// POST /signup
router.post("/signup", users.signUp);

// POST /login
router.post("/login", users.login);

// GET /userinfo
router.get("/userinfo", users.userInfo);

// POST /logout
router.post("/logout", users.logout);

// PUT /profile
router.put("/profile", users.changeProfile);

// PUT /password
router.put("/password", users.changePassword);

module.exports = router;
