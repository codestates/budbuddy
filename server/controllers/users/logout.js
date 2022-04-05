const checkAuth = require("../../modules/verifyCookieToken");
const kakao = require("../../modules/kakao");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  if (verify.kakaoAccessToken) {
    const kakaoRes = await kakao.logout(verify.kakaoAccessToken);
    console.log("kakaoRes: ", kakaoRes);
  }

  res.clearCookie("accessToken");
  res.status(200).end();
};
