const kakao = require("../../../modules/kakao");
const { Users, Images } = require("../../../models/index");
const jwtModule = require("../../../modules/jwt");
module.exports = async (req, res) => {
  if (!req.query.code) {
    return res.status(403);
  }

  let userInfo;
  try {
    var { accessToken, refreshToken } = await kakao.getToken(req.query.code);
    // const tokenInfo = await kakao.getAccessTokenInfo(accessToken);
    userInfo = await kakao.getUserInfo(accessToken);
  } catch (err) {
    console.error(err);
    return res.status(err.response.status).send(`${err.response.statusText}<br />${err.response.data.error_code}`);
  }

  const kakaoId = userInfo.id;
  const { nickname: kakaoNickname, profile_image_url: kakaoProfileImage } = userInfo.kakao_account.profile;
  const kakaoEmail = userInfo.kakao_account.email;

  try {
    var [user, created] = await Users.findOrCreate({
      where: { email: kakaoEmail },
      defaults: {
        social: `kakao_${kakaoId}`,
        nickname: kakaoNickname,
        profile_image_id: null,
      },
    });

    if (created) {
      const image = await Images.create({
        user_id: user.id,
        store_path: kakaoProfileImage,
        // ext: null,
        // filename: "kakaoProfile",
        // store_filename: null,
      });
      user.profile_image_id = image.id;
      await user.save();
      res.status(201);
      console.log("new social user: ", user.toJSON());
    } else {
      res.status(200);
      // console.log("already regesisted user: ", user.toJSON());
    }
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }

  const jwtPayload = {
    idx: user.id,
    email: user.email,
    profileImage: user.profile_image_id,
    created_at: user.created_at,
    kakaoAccessToken: accessToken,
  };

  try {
    var serverAccessToken = await jwtModule.sign(jwtPayload);
    res.cookie("accessToken", serverAccessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.redirect(process.env.CLIENT_REDIRECT_URI);
  } catch (err) {
    return res.status(500).send(err);
  }
};
