const checkAuth = require("../../modules/verifyCookieToken");
const { Journals } = require("../../models/index");

module.exports = async (req, res) => {
  if (!req.params.id) return res.status(400).send({ message: "Bad Request" });
  const journal_id = req.params.id;

  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;

  try {
    const journal = await Journals.findByPk(journal_id);
    if (!journal) return res.status(404).send({ message: "Not Found" });
    if (journal.user_id !== user_id) return res.status(403).send({ message: "Forbidden" });

    await Journals.destroy({
      where: {
        id: journal_id,
      },
    });
    return res.status(204).end();
  } catch (err) {
    return res.status(500).send(err);
  }
};
