const { Plants } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;
  const { name, image_id = null } = req.body;

  if (!name) return res.status(400).send({ message: "Bad Request" });

  try {
    const [plant, created] = await Plants.findOrCreate({
      where: { user_id, name },
      defaults: {
        image_id,
      },
    });

    if (created) {
      return res.status(201).send({ message: "Created", data: plant.id });
    } else {
      return res.status(409).send({ message: `Conflict, Used name: ${name}` });
    }
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
