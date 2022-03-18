import React, { useState, useRef } from "react";
import { Content, BGWrapper, SignupWrapper, InputWrapper } from "./pageStyled/SingupStyled";
import axios from "axios";
import ShadowModal from "../modules/Modal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser, faMask } from "@fortawesome/free-solid-svg-icons";

//클라에서는 유효성 검사만하고 서버에서 존재하는지 아닌지 여부를 처리해야한다
//가입 취소 버튼 -> 홈
//배경 이미지 전환 트랜지션 필요
const Signup = () => {
  const [modalCode, setErrCode] = useState(0);

  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const nickRef = useRef(null);

  async function reqSingup() {
    const payload = {
      userId: idRef.current.value,
      password: passwordRef.current.value,
      nickname: nickRef.current.value,
    };

    try {
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/signup", payload);
      console.log("회원가입 응답::::", resData);

      setErrCode(201);
    } catch (err) {
      const err_code = Number(
        JSON.stringify(err.message)
          .split(" ")
          .pop()
          .replace(/[^0-9]/g, ""),
      );
      setErrCode(err_code);
    }
  }

  function makeErrModal(modalCode) {
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
    };
    if (!tasks[modalCode]) {
      console.log(`예외처리하지 않는 모달코드(${modalCode})입니다:`);
      return null;
    }
    return tasks[modalCode]();
  }

  let imgNumber = 4976;

  return (
    <Content>
      {makeErrModal(modalCode)}
      <br />
      <BGWrapper>
        <img src={`signupBg/IMG_${imgNumber || 4311}.JPG`} alt={`bg`} />
        <div className="backText">
          <p>
            Take care of <span className="green">your plants</span>
          </p>
          <h1 className="green">
            Bud<span>Buddy</span>
          </h1>
          <p>
            We <strong>love</strong> and <strong>protect nature</strong> stuff
          </p>
        </div>
      </BGWrapper>
      <br />
      <br />
      <SignupWrapper>
        <p className="signupText">회원가입</p>
        <InputWrapper className="inputWrapper">
          <FontAwesomeIcon className="idIcon icon" icon={faUser} />
          <input className="inputId" ref={idRef} type="text" placeholder="ID를 입력하세요" maxLength={18} />
          <FontAwesomeIcon className="passIcon icon" icon={faKey} />
          <input className="inputPass" ref={passwordRef} type="text" placeholder="비밀번호를 입력하세요" maxLength={18} />
          <FontAwesomeIcon className="nickIcon icon" icon={faMask} />
          <input className="inputNick" ref={nickRef} type="text" placeholder="사용할 닉네임을 입력하세요" maxLength={18} />
        </InputWrapper>
        <hr className="hr" width="90%" />
        <button
          className="join"
          type="submit"
          value="Join"
          onClick={() => {
            reqSingup();
            setErrCode(0);
          }}
        >
          Join
        </button>
      </SignupWrapper>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Content>
  );
};

export default Signup;
