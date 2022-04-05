var express = require("express");
var router = express.Router();

const { journals, replies } = require("../controllers");

// POST /journals
router.post("/", journals.newJournal);

// GET /journals
router.get("/", journals.listJournals.all);

// GET /journals/my
router.get("/my", journals.listJournals.my);

// GET /journals/:id
router.get("/:id", journals.listJournals.id);

// DELETE /journals/:id
router.delete("/:id", journals.deleteJournals);

// POST /journals/:id/replies
router.post("/:id/replies", replies.newReply);

// GET /journals/:id/replies
router.get("/:id/replies", replies.getReplies);

// DELETE /journals/:id/replies/:replyId
router.delete("/replies/:replyId", replies.deleteReply);

module.exports = router;
