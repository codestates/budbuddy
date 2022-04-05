const { Plants } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  if (isNaN(id)) return res.status(400).send({ message: "Bad Request", data: "id is NaN" });

  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;
  console.log("서버 문제는?", user_id, id);
  try {
    const count = await Plants.destroy({
      where: {
        user_id,
        id,
      },
    });
    if (count === 0) {
      return res.status(404).send({ message: "Not Found" });
    }
    res.status(204).end();
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
