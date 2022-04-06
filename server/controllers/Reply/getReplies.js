const { Replies, Journals, Users } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  const journal_id = req.params.id;
  try {
    const journal = await Journals.findByPk(journal_id);

    if (!journal) return res.status(404).send({ message: "Not Found" });
    if (!journal.public) {
      try {
        var verify = await checkAuth(req, res);
      } catch (err) {
        return err; // break
      }
      const user_id = verify.idx;
      if (journal.user_id !== user_id) return res.status(403).send({ message: "Forbidden" });
    }
    const replies = await Replies.findAll({
      where: {
        journal_id,
      },
      order: [
        ["group_id", "ASC"],
        ["id", "ASC"],
      ],
      include: {
        model: Users,
        attributes: {
          exclude: ["password", "salt"],
        },
      },
    });

    return res.status(200).send({ message: "ok", data: replies });
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
