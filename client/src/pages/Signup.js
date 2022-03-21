import React, { useState, useRef } from "react";
import styled from "styled-components";
import { BGWrapper } from "../styles/CommonStyled";
import { SignupWrapper, InputWrapper } from "../styles/pages/SingupStyled";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser, faMask } from "@fortawesome/free-solid-svg-icons";
import { validId, validPassword, validNickName, removeHangul } from "../modules/validation";
import { useNavigate } from "react-router-dom";
import { sleep, makeModal, parseErrCode } from "../utils/errExeption";
import useStore from "../store/store";

const SignupBG = styled(BGWrapper)`
  padding-top: ${(props) => props.theme.backgroundPaddingTop};

  margin: 0 1rem 0 1rem;

  > .std {
    box-shadow: 15px 15px 7px ${(props) => props.theme.boxShadowColor};
  }

  .backText {
    > h1 {
      text-transform: uppercase;
      outline: 2px solid rgb(255, 255, 255, 0.5);
      outline-offset: 0.3em;
      display: inline-block;
      margin: 0.4em 0 0.5em;
    }

    > h1 > span {
      text-transform: capitalize;
      font-weight: 0;
    }

    .green {
      color: green;
    }
  }
`;

//배경 이미지 전환 트랜지션 필요
const Signup = () => {
  const [modalCode, setModalCode] = useState(0);
  const [isValid, setIsValid] = useState(false);

  const checkId = useRef(null);
  const checkPass = useRef(null);
  const checkNick = useRef(null);

  let imgNumber = 4976;
  let navigate = useNavigate();
  const { setLogin } = useStore();

  async function reqSingup(payload) {
    try {
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/signup", payload);
      // console.log("회원가입 응답::::", resData.data);
      setModalCode(resData.data.message);
      if (resData.data.message === "signupSuccess") {
        await sleep(700);
        setLogin(true);
        navigate("/mypage");
      }
    } catch (err) {
      const err_code = parseErrCode(err.message);
      setModalCode(err_code);
    }
  }

  function chValidation(e) {
    const className = e.target.className;
    if (e.target.value === "") {
      explainSignup(e);
      return;
    }

    switch (className) {
      case "inputId":
        {
          const isValid = validId(e.target.value);
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
          e.target.value = removeHangul(e.target.value);
          const isValid = validPassword(e.target.value);
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
          const isValid = validNickName(e.target.value);
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
    if (e.target.value !== "") return;

    switch (className) {
      case "inputId": {
        checkId.current.className = "chId ch";
        return (checkId.current.textContent = "첫글자는 영문이며 특수문자,한글 및 공백 사용불가\n 총 4~15글자 사이여야 합니다.");
      }
      case "inputPass":
        checkPass.current.className = "chPass ch";
        return (checkPass.current.textContent = "영문, 특수문자, 숫자 사용가능하며\n 총6~16글자 사이여야합니다");
      case "inputNick":
        checkNick.current.className = "chNick ch";
        return (checkNick.current.textContent = "첫글자는 영문이며 숫자 사용가능하지만\n 특수문자,한글 및 공백은 사용 불가입니다.");
      default:
        return;
    }
  }

  function chDivInit(e) {
    // if (e.target.value !== "") return;
    const className = e.target.className;

    switch (className) {
      case "inputId": {
        checkId.current.className = "chId ch";
        checkId.current.textContent = "";
        return;
      }
      case "inputPass": {
        checkPass.current.className = "chPass ch";
        checkPass.current.textContent = "";
        return;
      }
      case "inputNick": {
        checkNick.current.className = "chNick ch";
        checkNick.current.textContent = "";
        return;
      }
      default:
        return;
    }
  }

  function explainReset(e) {
    const className = e.target.className;

    if (e.target.value === "") {
      setIsValid(false);
      chDivInit(e);
      return;
    }

    switch (className) {
      case "inputId": {
        const isValid = validId(e.target.value);
        if (!isValid) {
          setIsValid(false);
          checkId.current.textContent = "유효하지 않은 아이디입니다";
          checkId.current.className = "chId ch invalid";
        } else {
          setIsValid(true);
          checkId.current.className = "chId ch";
          checkId.current.textContent = "";
        }
        return;
      }
      case "inputPass": {
        const isValid = validPassword(e.target.value);
        if (!isValid) {
          setIsValid(false);
          checkPass.current.textContent = "유효하지 않은 비밀번호입니다";
          checkPass.current.className = "chPass ch invalid";
        } else {
          setIsValid(true);
          checkPass.current.className = "chPass ch";
          checkPass.current.textContent = "";
        }
        return;
      }
      case "inputNick": {
        const isValid = validNickName(e.target.value);
        if (!isValid) {
          setIsValid(false);
          checkNick.current.textContent = "유효하지 않은 닉네임입니다";
          checkNick.current.className = "chNick ch invalid";
        } else {
          setIsValid(true);
          checkNick.current.className = "chNick ch";
          checkNick.current.textContent = "";
        }
        return;
      }
      default:
        return;
    }
  }

  function join(e) {
    e.preventDefault();
    const { userId, password, nickname } = e.target;
    // console.log("Join:::", userId.value, password.value, nickname.value);

    if (userId.value === "" || password.value === "" || nickname.value === "") {
      setModalCode("reqfillform");
      return;
    } else if (!isValid) {
      setModalCode("invalidform");
      return;
    }

    const signupInfo = {
      userId: userId.value,
      password: password.value,
      nickname: nickname.value,
    };

    reqSingup(signupInfo);
  }

  return (
    <div>
      {makeModal(modalCode)}
      <SignupBG>
        <div className="std">
          <img className="signupBg" src={`signupBg/IMG_${imgNumber || 4311}.JPG`} alt={`bg`} />
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
        </div>
      </SignupBG>
      <SignupWrapper onSubmit={join}>
        <p className="signupText">회원가입</p>
        <InputWrapper className="inputWrapper">
          <FontAwesomeIcon className="idIcon icon" icon={faUser} />
          <input className="inputId" name="userId" type="text" placeholder="ID를 입력하세요" maxLength={15} onBlur={explainReset} onFocus={explainSignup} onChange={chValidation} />
          <div ref={checkId} className="chId ch" name="chId"></div>
          <FontAwesomeIcon className="passIcon icon" icon={faKey} />
          <input className="inputPass" name="password" type="text" placeholder="비밀번호를 입력하세요" maxLength={20} onBlur={explainReset} onFocus={explainSignup} onChange={chValidation} />
          <div ref={checkPass} className="chPass ch"></div>
          <FontAwesomeIcon className="nickIcon icon" icon={faMask} />
          <input className="inputNick" name="nickname" type="text" placeholder="사용할 닉네임을 입력하세요" maxLength={15} onBlur={explainReset} onFocus={explainSignup} onChange={chValidation} />
          <div ref={checkNick} className="chNick ch"></div>
        </InputWrapper>
        <hr className="hr" width="90%" />
        <button
          className="join btn"
          type="submit"
          onBlur={() => {
            setModalCode(0);
          }}>
          Join
        </button>
        <div
          className="cancle btn"
          onClick={async () => {
            await sleep(200);
            navigate("/");
          }}>
          가입취소
        </div>
      </SignupWrapper>
    </div>
  );
};

export default Signup;
