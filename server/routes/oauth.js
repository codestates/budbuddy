var express = require("express");
var router = express.Router();

const { oauth } = require("../controllers");

// 
router.get("/kakao", oauth.kakaoRequestToken);

module.exports = router;
