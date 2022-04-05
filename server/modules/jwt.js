const jwt = require("jsonwebtoken");
const ACCESS_SECRET = process.env.ACCESS_SECRET;
module.exports = {
  sign: async (payload) => {
    return await new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        ACCESS_SECRET,
        {
          expiresIn: "1d",
          issuer: "https://server.budbuddy.click",
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        },
      );
    });
  },
  verify: async (token) => {
    return await new Promise((resolve, reject) => {
      jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
  },
};
