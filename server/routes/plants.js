var express = require("express");
var router = express.Router();

const { plants } = require("../controllers");

// GET /plants
router.get("/", plants.listPlants);

// POST /plants
router.post("/", plants.newPlant);

// DELETE /plants
router.delete("/:id", plants.deletePlant);

// PUT /plants/:id
router.put("/:id", plants.updatePlant);

module.exports = router;
