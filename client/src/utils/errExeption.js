import ShadowModal from "../components/Modal";
import { Link } from "react-router-dom";

export const parseErrCode = (msg) => {
  return Number(
    JSON.stringify(msg)
      .split(" ")
      .pop()
      .replace(/[^0-9]/g, ""),
  );
};
export function makeModal(modalCode = 0) {
  const tasks = {
    usedEmail() {
      return <ShadowModal text="이미 가입된 회원입니다" />;
    },
    signupSuccess() {
      console.log("가입성공 테스트");
      return (
        <Link to="/login">
          <ShadowModal text={`회원가입이 완료되었습니다.\n로그인 페이지로 이동합니다`} />
        </Link>
      );
    },
    testLogin() {
      return (
        <Link to="/">
          <ShadowModal text={`테스트 계정으로 시작합니다`} />
        </Link>
      );
    },
    doNotExistUser() {
      return <ShadowModal text={`존재하지 않는 유저입니다.`} />;
    },
    wrongPassword() {
      return <ShadowModal text={`비밀번호가 맞지 않습니다.`} />;
    },
    reqfillform() {
      return <ShadowModal text={`회원가입 양식을 채워주세요.`} />;
    },
    invalidform() {
      return <ShadowModal text={`회원가입 양식이 유효하지 않습니다.`} />;
    },
    reqfillLoginform() {
      return <ShadowModal text={`로그인 양식을 채워주세요.`} />;
    },
  };
  if (!tasks[modalCode]) {
    // console.log(`예외처리하지 않는 모달코드(${modalCode})입니다:`);
    return null;
  }
  return tasks[modalCode]();
}
