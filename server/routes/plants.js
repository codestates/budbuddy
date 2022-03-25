var express = require("express");
var router = express.Router();

const { plants } = require("../controllers");

// GET /plants
router.get("/", plants.listPlants);

// POST /plants
router.post("/", plants.newPlant);

// DELETE /plants
router.delete("/:id", plants.deletePlant);

module.exports = router;
