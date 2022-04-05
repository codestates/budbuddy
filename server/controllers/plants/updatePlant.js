const { Plants, Images } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;

  if (!req.params.id) return res.status(400).send({ message: "Bad Request" });

  const { name = null, image_id = null } = req.body;
  if (!name && !image_id) return res.status(400).send({ message: "Bad Request" });

  const id = req.params.id;

  try {
    if (image_id !== null) {
      const image = await Images.findByPk(image_id);
      if (!image) return res.status(404).send({ message: `Not Found, image id: ${image_id} invalid` });
      if (image.user_id !== user_id) return res.status(403).send({ message: `Forbidden, image id: ${image_id} is not allowed` });
    }
    const plant = await Plants.findOne({ where: { id } });

    if (!plant) return res.status(404).send({ message: "Not Found" });
    if (plant.user_id !== user_id) return res.status(403).send({ message: "Forbidden" });

    await Plants.update(
      {
        name: name || plant.name,
        image_id: image_id || plant.image_id,
      },
      { where: { id } },
    );

    return res.status(200).send({ message: `Updated` });
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
