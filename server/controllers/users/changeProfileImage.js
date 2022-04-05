const checkAuth = require("../../modules/verifyCookieToken");
const { Users, Images } = require("../../models/index");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }
  const { profile_image_id } = req.body;
  if (!profile_image_id) return res.status(400).send({ message: "Bad Request" });
  const user_id = verify.idx;
  try {
    const image = await Images.findByPk(profile_image_id);
    if (!image) return res.status(404).send({ message: `Not Found, profile id: ${profile_image_id} invalid` });
    if (image.user_id !== user_id) return res.status(403).send({ message: `Forbidden, profile id: ${profile_image_id} is not allowed` });

    var user = await Users.update(
      {
        profile_image_id,
      },
      {
        where: {
          id: user_id,
        },
      },
    );

    if (!user) {
      return res.status(404).send({ message: "Not Found" });
    }

    return res.status(200).send({ message: "Updated" });
  } catch (err) {
    return res.status(500).send({ message: "Error", data: err });
  }
};
