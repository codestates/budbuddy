const { Users } = require("../../models/index");

const createPassword = require("../../modules/createPassword");

module.exports = async (req, res) => {
  //이 유효성 검사는 클라에서 처리한다
  const { email, password, nickname } = req.body;
  const { password: encryptPassword, salt } = await createPassword(password);

  // TODO: 유효검사
  if (!email || !password || !nickname) {
    return res.status(400).json({ message: "Bad Request" });
  }

  try {
    const [user, created] = await Users.findOrCreate({
      where: { email },
      defaults: {
        password: encryptPassword,
        nickname,
        salt,
      },
    });

    if (created) {
      return res.status(201).send({ message: "signupSuccess", data: user.id });
    } else {
      return res.status(403).send({ message: "usedEmail" });
    }
  } catch (err) {
    console.error("회원가입 에러 발생: ", err);
  }
};
