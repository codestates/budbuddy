const { User } = require("../../models/index");
const createPassword = require("../../modules/createPassword");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
  //이 유효성 검사는 클라에서 처리한다
  const { userId, password, nickname } = req.body;
  const { password: encryptPassword, salt } = await createPassword(password);

  try {
    const [user, created] = await User.findOrCreate({
      where: { userId },
      defaults: {
        password: encryptPassword,
        nickname,
        salt,
      },
    });
    console.log("얻어온 유저의 값: ", user.toJson(), 'isCreated? : ', created);

    if (created) {
      return res.status(201).json({ message: `${userId}의 회원가입이 완료되었습니다`, id: user.dataValues.userId });
    } else {
      console.log("기존 회원 가입");
      return res.status(401).send("기존에 가입되어 있는 회원입니다.");
    }
  } catch (err) {
    console.error("회원가입 에러 발생: ", err);
  }
};
