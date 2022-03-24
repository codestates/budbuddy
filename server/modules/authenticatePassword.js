const { Users } = require("../models/index");
const crypto = require("crypto");

const authenticatePassword = (email, plainPassword) =>
  new Promise(async (resolve, reject) => {
    // salt를 가져오는 부분은 각자의 DB에 따라 수정
    try {
      const user = await Users.findOne({
        attributes: ["salt"],
        where: {
          email,
        },
      });
      const salt = user.salt;
      console.log("toJson: ", user.toJSON());
      crypto.pbkdf2(plainPassword, salt, 100000, 64, "sha512", (err, key) => {
        if (err) reject(err);
        resolve(key.toString("base64"));
      });
    } catch (err) {
      reject(err);
    }
  });

module.exports = authenticatePassword;
