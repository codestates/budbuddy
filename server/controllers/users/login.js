const { Users } = require("../../models/index");
const createPassword = require("../../modules/createPassword");
const jwtModule = require("../../modules/jwt");

module.exports = async (req, res) => {
  const { email: reqEmail, password: reqPassword } = req.body;

  if (!reqEmail || !reqPassword) {
    return res.status(400).send({ message: "Bad Request" });
  }

  const user = await Users.findOne({
    where: {
      email: reqEmail,
    },
  });

  if (!user) return res.status(404).send({ message: "NotFound" });

  const { password: reqEncryptPassword } = await createPassword(reqPassword, user.salt);

  if (user.password !== reqEncryptPassword) return res.status(403).send({ message: "wrongPassword" });

  const jwtPayload = {
    idx: user.id,
    email: user.email,
    profileImage: user.profile_image_id,
    created_at: user.created_at,
  };
  try {
    var accessToken = await jwtModule.sign(jwtPayload);
  } catch (err) {
    return res.status(500).send(err);
  }

  res.cookie("accessToken", accessToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  return res.status(200).send({ data: accessToken, message: "sent AccessToken successfully" });
};
