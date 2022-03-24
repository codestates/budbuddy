const jwtModule = require("../../modules/jwt");

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
  return res.status(200).send({ message: "ok", data: verify });
};
