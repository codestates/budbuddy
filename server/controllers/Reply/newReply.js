const { Replies, Journals } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;
  if (!req.body.body) return res.status(400).send({ message: "Bad Request" });
  const { body, group_id = null } = req.body;

  const journal_id = req.params.id;
  try {
    const journal = await Journals.findByPk(journal_id);

    if (!journal) return res.status(404).send({ message: "Not Found" });
    if (!journal.public) {
      if (journal.user_id !== user_id) return res.status(403).send({ message: "Forbidden" });
      return res.status(400).send({ message: "Can not reply on non public journal" });
    }
    const reply = await Replies.create({
      journal_id: journal.id,
      user_id,
      body,
      class: group_id === null ? 0 : 1,
    });

    if (group_id !== null) {
      reply.group_id = group_id;
      reply.save();
    } else {
      reply.group_id = reply.id;
      reply.save();
    }

    return res.status(201).send({ message: "Created", data: reply.id });
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
