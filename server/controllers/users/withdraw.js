const { Users, Plants, Replies, Journals, Images } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  try {
    const user_id = verify.idx;

    if (verify.kakaoAccessToken) await kakao.logout(verify.kakaoAccessToken);

    await Users.destroy({
      where: {
        id: user_id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error", data: err });
  }

  res.clearCookie("accessToken");

  return res.status(204).end();
};
