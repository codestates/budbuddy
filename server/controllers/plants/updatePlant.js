const { Plants } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;
  const { name } = req.body;
  if (!req.params.id || !name) return res.status(400).send({ message: "Bad Request" });
  const id = req.params.id;

  try {
    const plant = await Plants.findOne({
      where: { id },
    });

    if (!plant) return res.status(404).send({ message: "Not Found" });
    if (plant.user_id !== user_id) return res.status(403).send({ message: "Forbidden" });

    await Plants.update({ name }, { where: { id } });

    return res.status(200).send({ message: `Updated` });
    // return res.status(201).send({ message: "Created", data: plant.id });

    // return res.status(409).send({ message: `Conflict, Used name: ${name}` });
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
