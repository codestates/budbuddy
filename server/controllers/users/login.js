const { User } = require("../../models/index");
const makePasswordHashed = require("../../modules/makePasswordHashed");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { ACCESS_SECRET } = process.env;

module.exports = async (req, res) => {
  const { userId, password } = req.body;
  const findPassword = await makePasswordHashed(userId, password);

  // console.log("findPassword:::", findPassword);
  if (findPassword === undefined) {
    return res.status(404).send({ message: "doNotExistUser" });
  }

  const value = await User.findOne({
    where: {
      userId,
      password: findPassword,
    },
  });

  if (!value) {
    return res.status(403).send({ message: "wrongPassword" });
  }

  console.log("value:::", value);

  const { userId: findId, nickname } = value.dataValues;
  const payload = {
    findId,
    nickname,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1d" });
  payload.accessToken = accessToken;
  return res.status(200).send({ payload, message: "ok" });
};
