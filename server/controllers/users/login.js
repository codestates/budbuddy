const { Users } = require("../../models/index");
const authPassword = require("../../modules/authenticatePassword");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { ACCESS_SECRET } = process.env;

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const findPassword = await authPassword(email, password);

  if (findPassword === undefined) {
    return res.status(404).send({ message: "doNotExistUser" });
  }

  const value = await Users.findOne({
    where: {
      email,
      password: findPassword,
    },
  });

  if (!value) {
    return res.status(403).send({ message: "wrongPassword" });
  }

  const { email: findEmail, nickname } = value.dataValues;
  const payload = {
    findEmail,
    nickname,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1d" });
  payload.accessToken = accessToken;
  return res.status(200).send({ payload, message: "ok" });
};
