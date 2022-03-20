import React, { useState, useRef } from "react";
import { Content, BGWrapper, SignupWrapper, InputWrapper } from "./pageStyled/SingupStyled";
import axios from "axios";
import ShadowModal from "../modules/Modal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser, faMask } from "@fortawesome/free-solid-svg-icons";
import { validId, validPassword, validNickName, removeHangul } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import { sleep } from "../utils/thirdParty";

//배경 이미지 전환 트랜지션 필요

const Signup = () => {
  const [modalCode, setModalCode] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const nickRef = useRef(null);

  const checkId = useRef(null);
  const checkPass = useRef(null);
  const checkNick = useRef(null);

  async function reqSingup() {
    const payload = {
      userId: idRef.current.value,
      password: passwordRef.current.value,
      nickname: nickRef.current.value,
    };

    try {
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/signup", payload);
      console.log("회원가입 응답::::", resData);

      setModalCode(201);
    } catch (err) {
      const err_code = Number(
        JSON.stringify(err.message)
          .split(" ")
          .pop()
          .replace(/[^0-9]/g, ""),
      );
      setModalCode(err_code);
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

  function chValidation(e) {
    const className = e.target.className;

    switch (className) {
      case "inputId":
        {
          if (idRef.current.value === "") {
            explainSignup(e);
            return;
          }

          const isValid = validId(idRef.current.value);
          if (!isValid) {
            checkId.current.textContent = "유효하지 않은 아이디입니다";
            checkId.current.className = "chId ch invalid";
            setIsValid(false);
          } else {
            checkId.current.textContent = "";
            checkId.current.className = "chId ch";
            setIsValid(true);
          }
        }
        return;
      case "inputPass":
        {
          if (passwordRef.current.value === "") {
            explainSignup(e);
            return;
          }
          passwordRef.current.value = removeHangul(passwordRef.current.value);
          const isValid = validPassword(passwordRef.current.value);
          // console.log(className, isValid);
          if (!isValid) {
            checkPass.current.textContent = "유효하지 않은 비밀번호입니다";
            checkPass.current.className = "chPass ch invalid";
            setIsValid(false);
          } else {
            checkPass.current.textContent = "";
            checkPass.current.className = "chPass ch";
            setIsValid(true);
          }
        }
        return;
      case "inputNick":
        {
          if (nickRef.current.value === "") {
            explainSignup(e);
            return;
          }
          const isValid = validNickName(nickRef.current.value);
          // console.log(className, isValid);
          if (!isValid) {
            checkNick.current.textContent = "유효하지 않은 닉네임입니다";
            checkNick.current.className = "chNick ch invalid";
            setIsValid(false);
          } else {
            checkNick.current.textContent = "";
            checkNick.current.className = "chNick ch";
            setIsValid(true);
          }
        }
        return;
      default:
        return;
    }
  }

  function explainSignup(e) {
    const className = e.target.className;

    switch (className) {
      case "inputId": {
        if (idRef.current.value === "") {
          checkId.current.className = "chId ch";
          return (checkId.current.textContent = "첫글자는 영문이며 특수문자,한글 및 공백 사용불가\n 총 4~15글자 사이여야 합니다.");
        }
        return;
      }
      case "inputPass":
        if (passwordRef.current.value === "") {
          checkPass.current.className = "chPass ch";
          return (checkPass.current.textContent = "영문, 특수문자, 숫자 사용가능하며 총6~16글자 사이여야합니다");
        }
        return;
      case "inputNick":
        if (nickRef.current.value === "") {
          checkNick.current.className = "chNick ch";
          return (checkNick.current.textContent = "첫글자는 영문이며 숫자 사용가능하지만\n 특수문자,한글 및 공백은 사용 불가입니다.");
        }
        return;
      default:
        return;
    }
  }

  function explainReset(e) {
    const className = e.target.className;
    switch (className) {
      case "inputId": {
        if (idRef.current.value === "") {
          checkId.current.className = "chId ch";
          checkId.current.textContent = "";
          return;
        }

        const isValid = validId(idRef.current.value);
        if (!isValid) {
          checkId.current.textContent = "유효하지 않은 아이디입니다";
          checkId.current.className = "chId ch invalid";
        } else {
          checkId.current.className = "chId ch";
          checkId.current.textContent = "";
        }
        return;
      }
      case "inputPass": {
        if (passwordRef.current.value === "") {
          checkPass.current.className = "chPass ch";
          checkPass.current.textContent = "";
          return;
        }

        const isValid = validPassword(passwordRef.current.value);
        if (!isValid) {
          checkPass.current.textContent = "유효하지 않은 비밀번호입니다";
          checkPass.current.className = "chPass ch invalid";
        } else {
          checkPass.current.className = "chPass ch";
          checkPass.current.textContent = "";
        }
        return;
      }
      case "inputNick": {
        if (nickRef.current.value === "") {
          checkNick.current.className = "chNick ch";
          checkNick.current.textContent = "";
          return;
        }

        const isValid = validNickName(nickRef.current.value);
        if (!isValid) {
          checkNick.current.textContent = "유효하지 않은 닉네임입니다";
          checkNick.current.className = "chNick ch invalid";
        } else {
          checkNick.current.className = "chNick ch";
          checkNick.current.textContent = "";
        }
        return;
      }
      default:
        return;
    }
  }

  let imgNumber = 4976;
  let navigate = useNavigate();

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
          <input className="inputId" ref={idRef} type="text" placeholder="ID를 입력하세요" maxLength={15} onBlur={explainReset} onFocus={explainSignup} onChange={chValidation} />
          <div ref={checkId} className="chId ch"></div>
          <FontAwesomeIcon className="passIcon icon" icon={faKey} />
          <input className="inputPass" ref={passwordRef} type="text" placeholder="비밀번호를 입력하세요" maxLength={20} onBlur={explainReset} onFocus={explainSignup} onChange={chValidation} />
          <div ref={checkPass} className="chPass ch"></div>
          <FontAwesomeIcon className="nickIcon icon" icon={faMask} />
          <input className="inputNick" ref={nickRef} type="text" placeholder="사용할 닉네임을 입력하세요" maxLength={15} onBlur={explainReset} onFocus={explainSignup} onChange={chValidation} />
          <div ref={checkNick} className="chNick ch"></div>
        </InputWrapper>
        <hr className="hr" width="90%" />
        <button
          className="join btn"
          onClick={() => {
            if (!isValid) return;
            else if (idRef.current.value === "" || passwordRef.current.value === "" || nickRef.current.value === "") return;

            reqSingup();
            setModalCode(0);
          }}>
          Join
        </button>
        <button
          className="test btn"
          onClick={() => {
            setModalCode(101);
          }}>
          Test
        </button>
        <button
          className="cancle btn"
          onClick={async () => {
            await sleep(200);
            navigate("/");
          }}>
          가입취소
        </button>
      </SignupWrapper>
      <br />
      <br />
      <br />
      <br />
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