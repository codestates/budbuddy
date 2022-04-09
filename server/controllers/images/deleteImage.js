const { Images } = require("../../models");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  if (!req.params.id) return res.status(400).send({ message: "Bad Request" });
  const image_id = req.params.id;

  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;

  try {
    const image = await Images.findByPk(image_id);
    if (!image) return res.status(404).send({ message: "Not Found" });
    if (image.user_id !== user_id) return res.status(403).send({ message: "Forbidden" });

    await Images.destroy({
      where: {
        id: image_id,
      },
      individualHooks: true,
    });

    res.status(204).end();
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
