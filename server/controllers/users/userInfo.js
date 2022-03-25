const jwtModule = require("../../modules/jwt");
const { Users } = require("../../models/index");
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

  try {
    const reqEmail = verify.email;
    var user = await Users.findOne({
      attributes: ["id", "nickname", "social", "email", "profile_image_url", "created_at"],
      where: {
        email: reqEmail,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "Not Found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error", data: err });
  }

  return res.status(200).send({ message: "ok", data: user });
};
