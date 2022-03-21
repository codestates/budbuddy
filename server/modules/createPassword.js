const createSalt = require("./createSalt");
const crypto = require("crypto");

const createPassword = (plainPassword) => {
  return new Promise(async (resolve, reject) => {
    const salt = await createSalt();
    crypto.pbkdf2(plainPassword, salt, 100000, 64, "sha512", (err, key) => {
      if (err) reject(err);
      resolve({ password: key.toString("base64"), salt });
    });
  });
};

module.exports = createPassword;
