const { Users } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  try {
    const user_id = verify.idx;

    var user = await Users.findOne({
      attributes: {
        exclude: ["password", "salt", "social"],
      },
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "Not Found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error", data: err });
  }

  return res.status(200).send({ message: "ok", data: user.toJSON() });
};
