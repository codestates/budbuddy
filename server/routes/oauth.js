var express = require("express");
var router = express.Router();

const { oauth } = require("../controllers");

// 
router.get("/", oauth.requestToken);

module.exports = router;
