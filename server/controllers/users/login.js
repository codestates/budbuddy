const jwt = require("jsonwebtoken");
require("dotenv").config();

const { ACCESS_SECRET } = process.env;

module.exports = async (req, res) => {
  const { Id, password } = req.body;

  const payload = {
    Id,
    name: "jeyoung",
    age: 38,
    job: "programmer",
  };

  const opt = {
    expiresIn: "1h",
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET, opt);

  return res
    .status(200)
    .cookie("accessToken", accessToken, { maxAge: 60 * 60 * 60 * 60 * 100 })
    .send({ payload, message: "ok" });
};
