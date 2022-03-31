const { Users } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  try {
    if (!req.query.name) return res.status(400).send({ message: "Bad Request" });
    const nickname = req.query.name;

    var user = await Users.findOne({
      attributes: {
        exclude: ["password", "salt", "social"],
      },
      where: {
        nickname,
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
