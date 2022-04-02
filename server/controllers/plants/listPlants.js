const { Plants, Images } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;
  try {
    const plantsList = await Plants.findAll({
      where: {
        user_id,
      },
      include: {
        model: Images,
      },
    });

    if (plantsList.length === 0) return res.status(404).send({ message: "Not Found" });
    return res.status(200).send({ message: "ok", data: plantsList });
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
