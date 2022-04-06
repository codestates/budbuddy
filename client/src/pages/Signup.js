import React, { useState, useRef } from "react";
import styled from "styled-components";
import { SignupWrapper, InputWrapper } from "../styles/pages/SingupStyled";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser, faMask } from "@fortawesome/free-solid-svg-icons";
import { validEmail, validPassword, validNickName } from "../modules/validation";
import { useNavigate } from "react-router-dom";
import { makeModal } from "../utils/errExeption";
import { sleep } from "../modules/sleep";
import { bg } from "../resources";

const Layout = styled.div`
  padding-top: ${(props) => props.theme.backgroundPaddingTop};

  .signupWrapper {
    margin-top: 4.5rem;
  }
`;

const SignupBG = styled.div`
  margin: 0 0rem 0 0rem;
  text-align: center;

  .std {
    display: grid;
    position: relative;
  }

  img {
    width: 100%;
    height: ${(props) => props.theme.backgroundImgHeight};
    object-fit: cover;
    filter: blur(1px);
    border: none;
    border-top: solid 1px rgb(0, 0, 0, 0.4);
    border-bottom: solid 1px rgb(0, 0, 0, 0.4);
  }

  .backText {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: ${(props) => props.theme.fontWritePageMid};

    transform: translate(-50%, -50%);
    white-space: pre;

    font-weight: ${(props) => props.theme.fontWeightBg};
    color: ${(props) => props.theme.backgroundTextColor};

    > h1 {
      text-transform: uppercase;
      outline-offset: 0.4rem;
      outline: 2px solid rgb(255, 255, 255, 0.5);
      display: inline-block;
      padding: 0 0.5rem;
      margin: 0.4em 0 0.5em 0;
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

  const checkEmail = useRef(null);
  const checkPass = useRef(null);
  const checkNick = useRef(null);

  let navigate = useNavigate();

  async function reqSingup(payload) {
    try {
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/signup", payload);
      setModalCode(resData.data.message);
      if (resData.data.message === "signupSuccess") {
        await sleep(700);
        navigate("/login");
      }
    } catch (err) {
      setModalCode(err.response.data.message);
    }
  }

  function chValidation(e) {
    const className = e.target.className;
    if (e.target.value === "") {
      explainSignup(e);
      return;
    }

    switch (className) {
      case "inputEmail":
        {
          const isValid = validEmail(e.target.value);
          if (!isValid) {
            checkEmail.current.textContent = "유효하지 않은 이메일입니다";
            checkEmail.current.className = "chEmail ch invalid";
            setIsValid(false);
          } else {
            checkEmail.current.textContent = "";
            checkEmail.current.className = "chEmail ch";
            setIsValid(true);
          }
        }
        return;
      case "inputPass":
        {
          const isValid = validPassword(e.target.value);
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
      case "inputEmail": {
        checkEmail.current.className = "chEmail ch";
        return (checkEmail.current.textContent = "이메일 형식을 입력해주세요.");
      }
      case "inputPass":
        checkPass.current.className = "chPass ch";
        return (checkPass.current.textContent = "영문, 특수문자, 숫자 사용가능하며\n 6~16글자 사이여야합니다");
      case "inputNick":
        checkNick.current.className = "chNick ch";
        return (checkNick.current.textContent = "완성된 한글 및 영문,숫자만 사용가능하며\n 1~14글자 사이여야합니다");
      default:
        return;
    }
  }

  function chDivInit(e) {
    // if (e.target.value !== "") return;
    const className = e.target.className;

    switch (className) {
      case "inputEmail": {
        checkEmail.current.className = "chEmail ch";
        checkEmail.current.textContent = "";
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
      case "inputEmail": {
        const isValid = validEmail(e.target.value);
        if (!isValid) {
          setIsValid(false);
          checkEmail.current.textContent = "유효하지 않은 이메일 형식입니다";
          checkEmail.current.className = "chEmail ch invalid";
        } else {
          setIsValid(true);
          checkEmail.current.className = "chEmail ch";
          checkEmail.current.textContent = "";
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
    const { email, password, nickname } = e.target;

    if (email.value === "" || password.value === "" || nickname.value === "") {
      setModalCode("reqfillform");
      return;
    } else if (!isValid) {
      setModalCode("invalidform");
      return;
    }

    const signupInfo = {
      email: email.value,
      password: password.value,
      nickname: nickname.value,
    };

    reqSingup(signupInfo);
  }

  return (
    <Layout>
      {makeModal(modalCode)}
      <SignupBG>
        <div className="std">
          <img className="signupBg" src={bg[4] || ""} alt={`bg`} />
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
      <SignupWrapper className="signupWrapper" onSubmit={join}>
        <div className="signupText">회원가입</div>
        <InputWrapper className="inputWrapper">
          <FontAwesomeIcon className="idIcon icon" icon={faUser} />
          <input className="inputEmail" name="email" type="text" placeholder="이메일을 입력하세요" maxLength={30} onBlur={explainReset} onFocus={explainSignup} onChange={chValidation} />
          <div ref={checkEmail} className="chEmail ch" name="chEmail"></div>
          <FontAwesomeIcon className="passIcon icon" icon={faKey} />
          <input className="inputPass" name="password" type="password" placeholder="비밀번호를 입력하세요" maxLength={20} onBlur={explainReset} onFocus={explainSignup} onChange={chValidation} />
          <div ref={checkPass} className="chPass ch"></div>
          <FontAwesomeIcon className="nickIcon icon" icon={faMask} />
          <input className="inputNick" name="nickname" type="text" placeholder="사용할 닉네임을 입력하세요" maxLength={15} onBlur={explainReset} onFocus={explainSignup} onChange={chValidation} />
          <div ref={checkNick} className="chNick ch"></div>
        </InputWrapper>
        <hr className="hr" width="90%" />
        <div className="btnbox">
          <button
            className="join btn"
            type="submit"
            onBlur={() => {
              setModalCode(0);
            }}>
            Join
          </button>
          <span
            className="cancle btn"
            onClick={() => {
              navigate("/");
            }}>
            가입취소
          </span>
        </div>
      </SignupWrapper>
    </Layout>
  );
};

export default Signup;
