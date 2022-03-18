const createSalt = require("./createSalt");
const crypto = require("crypto");

const createHashedPassword = (plainPassword) => {
  return new Promise(async (resolve, reject) => {
    const salt = await createSalt();
    crypto.pbkdf2(plainPassword, salt, 100000, 64, "sha512", (err, key) => {
      if (err) reject(err);
      resolve({ password: key.toString("base64"), salt });
    });
  });
};

// createHashedPassword('asd').then((res, err) => {
//     console.log(res, err);
// })

module.exports = createHashedPassword;
