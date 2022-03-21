import ShadowModal from "../components/Modal";
import { Link } from "react-router-dom";

export const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));
export function makeModal(modalCode = 0) {
  const tasks = {
    401() {
      return <ShadowModal text="이미 가입된 회원입니다" />;
    },
    201() {
      return (
        <Link to="/login">
          <ShadowModal text={`회원가입이 완료되었습니다.\n로그인 페이지로 이동합니다`} />
        </Link>
      );
    },
    101() {
      return (
        <Link to="/">
          <ShadowModal text={`테스트 계정으로 시작합니다`} />
        </Link>
      );
    },
  };
  if (!tasks[modalCode]) {
    // console.log(`예외처리하지 않는 모달코드(${modalCode})입니다:`);
    return null;
  }
  return tasks[modalCode]();
}
