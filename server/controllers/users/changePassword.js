const { Users } = require("../../models/index");
const createPassword = require("../../modules/createPassword");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }
  const user_id = verify.idx;

  if (!req.body.currentPassword || !req.body.password) return res.status(400).send({ message: "Bad Request" });
  const { currentPassword, password: toPassword } = req.body;
  try {
    const user = await Users.findByPk(user_id);
    const { password: reqPassword } = await createPassword(currentPassword, user.salt);

    if (user.password !== reqPassword) return res.status(403).send({ message: "wrongPassword" });
    const { password: newPassword, salt: newSalt } = await createPassword(toPassword);
    user.password = newPassword;
    user.salt = newSalt;
    await user.save();
    return res.status(200).send({ message: "Updated" });
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
