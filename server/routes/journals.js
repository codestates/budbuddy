var express = require("express");
var router = express.Router();

const { journals } = require("../controllers");

// GET /journals
router.get("/", journals.listJournals.all);
// GET /journals/my
router.get("/my", journals.listJournals.my);

// GET /journals/:id
router.get("/:id", journals.listJournals.id);

// POST /journals
router.post("/", journals.newJournal);

// DELETE /journals
router.delete("/:id", journals.deleteJournals);

module.exports = router;
