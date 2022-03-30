const { Plants } = require("../../models/index");
const jwtModule = require("../../modules/jwt");

module.exports = async (req, res) => {
  if (!req.cookies.accessToken) {
    return res.status(400).send({ message: "Bad Request", data: "There is no accessToken" });
  }

  const { accessToken } = req.cookies;
  try {
    var verify = await jwtModule.verify(accessToken);
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized Token", data: err });
  }

  const user_id = verify.idx;
  try {
    const plantsList = await Plants.findAll({
      where: {
        user_id,
      },
    });

    // console.log("[get /plants:: plantsList:]", plantsList);

    if (plantsList.length === 0) return res.status(404).send({ message: "Not Found" });
    return res.status(200).send({ message: "ok", data: plantsList });
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
