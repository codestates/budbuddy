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
  const { name } = req.body;

  if (!name) return res.status(400).send({ message: "Bad Request" });

  try {
    const [plant, created] = await Plants.findOrCreate({
      where: { user_id, name },
    });

    if (created) {
      return res.status(201).send({ message: "successfullyRegisted", data: plant.id });
    } else {
      return res.status(409).send({ message: "usedName" });
    }
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
