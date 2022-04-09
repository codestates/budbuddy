var express = require("express");
var router = express.Router();
const upload = require("../modules/multer");

const { images } = require("../controllers");

// POST /images
router.post("/", upload.single("image"), images.uploadImage);

router.delete("/:id", images.deleteImage);

module.exports = router;
