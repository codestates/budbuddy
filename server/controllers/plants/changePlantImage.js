const checkAuth = require("../../modules/verifyCookieToken");
const { Plants, Images } = require("../../models/index");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }
  const { image_id } = req.body;
  if (!image_id) return res.status(400).send({ message: "Bad Request" });
  const user_id = verify.idx;
  try {
    const image = await Images.findByPk(image_id);
    if (!image) return res.status(404).send({ message: `Not Found, image id: ${image_id} invalid` });
    if (image.user_id !== user_id) return res.status(403).send({ message: `Forbidden, image id: ${image_id} is not allowed` });

    var plant = await Plants.update(
      {
        image_id,
      },
      {
        where: {
          id: user_id,
        },
      },
    );

    if (!plant) return res.status(404).send({ message: "Not Found" });

    return res.status(200).send({ message: "Updated" });
  } catch (err) {
    return res.status(500).send({ message: "Error", data: err });
  }
};
