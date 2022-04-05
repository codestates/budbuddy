const jwtModule = require("../modules/jwt");
const { Users } = require("../models/index");
/**
   * ## 쿠키의 토큰을 검사합니다
   * - 성공시 jwt verify값을 리턴합니다
   * - 실패시 res.status().send() 를 실행합니다.
   * @example try { 
  var verify = await checkAuth(req, res); 
  } catch (err) {
    return err; // break
  }
   */
module.exports = (req, res) => {
  return new Promise(async (resolve, reject) => {
    if (!req.cookies.accessToken) {
      reject(res.status(400).send({ message: "Bad Request", data: "There is no accessToken" }));
      return;
    }

    const { accessToken } = req.cookies;
    try {
      var verify = await jwtModule.verify(accessToken);
      const user = await Users.findByPk(verify.idx);
      if (!user) reject(res.status(401).send({ message: "UnRegisted User Token" }));
      resolve(verify);
      return;
    } catch (err) {
      reject(res.status(401).send({ message: "Unauthorized Token", data: err }));
    }
  });
};
