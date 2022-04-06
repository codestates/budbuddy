const { Replies } = require("../../models/index");
const { Op } = require("sequelize");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;

  const reply_Id = req.params.replyId;

  try {
    const reply = await Replies.findByPk(reply_Id);
    if (!reply) return res.status(404).send({ message: "Not Found" });
    if (reply.user_id !== user_id) return res.status(403).send({ message: "Forbidden, permission denied" });

    await Replies.destroy({
      where: {
        [Op.or]: [{ group_id: reply_Id }, { id: reply_Id }],
      },
    });

    return res.status(204).end();
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
