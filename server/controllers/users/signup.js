const { User } = require("../../models/index");
const createHashedPassword = require("../../modules/createHashedPassword");

module.exports = async (req, res) => {
  //이 유효성 검사는 클라에서 처리한다
  const { email, password, nickname } = req.body;
  const { password: encryptPassword, salt } = await createHashedPassword(password);

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        password: encryptPassword,
        nickname,
        salt,
      },
    });
    // console.log("얻어온 유저의 값:::::", user.dataValues, created);

    if (created) {
      return res.status(201).json({ message: "signupSuccess", email: user.dataValues.email });
    } else {
      console.log("기존 회원 가입");
      return res.status(403).json({ message: "usedEmail" });
    }
  } catch (err) {
    console.log("회원가입 에러 발생:::::", err);
  }
};
