import React, { useRef, useState } from "react";
import styled from "styled-components";
import { OutLine, Content, BGWrapper } from "./pageStyled/common/CommonStyled";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import useStore from "../store/store";
import { sleep, makeModal } from "../utils/thirdParty";

const BrWrapper = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;

  .hr {
    margin: 1.8rem;
    background-color: white;
    width: 600%;
  }
`;

const LoginBG = styled(BGWrapper)`
  padding-top: ${(props) => props.theme.backgroundPaddingTop};
  padding-bottom: 1rem;

  .backText {
    @media screen and (min-width: 390px) {
      font-size: 1.7rem;
    }

    @media screen and (min-width: 520px) {
      font-size: 2.4rem;
    }
  }
`;

const LoginForm = styled.div`
  margin: 2rem 3rem 0 3rem;
  padding: 1rem 1rem 0.4rem 1rem;
  background-color: #f7f6f6;
  border-radius: ${(props) => props.theme.borderRadius};

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1fr, auto));
  grid-template-rows: repeat(3, minmax(1fr, 100%)) minmax(0.5fr, 100%);
  grid-template-areas:
    "idIcon inputId inputId inputId inputId inputId"
    "passIcon inputPass inputPass inputPass inputPass inputPass"
    ". login login test test ."
    ". . . . . signup";

  justify-content: start;
  align-items: end;
  > * {
    border: none;
    padding: 0.5rem;
  }

  > .icon {
    font-size: ${(props) => props.theme.fontIconSize};
    filter: invert(20%) sepia(100%) saturate(100%) hue-rotate(0deg) brightness(100%) contrast(0%);
  }

  .idIcon {
    margin-top: 40%;
    grid-area: idIcon;
  }
  .inputId {
    margin-top: 10%;
    grid-area: inputId;
  }

  .passIcon {
    margin-top: 40%;
    grid-area: passIcon;
  }

  .inputPass {
    margin-top: 10%;
    grid-area: inputPass;
  }

  .login {
    grid-area: login;
    margin-top: 10%;
  }

  .test {
    grid-area: test;
    margin-top: 10%;
  }

  .signup {
    grid-area: signup;
    padding: 0;
    margin-top: 1rem;
  }
  .signtext {
    font-size: 19px;
  }

  .textAni {
    transition: color 0.2s cubic-bezier(0, 1.23, 1, 0.55);
  }

  .textAni:hover {
    color: MediumPurple;
  }

  a {
    color: black;
  }
`;

const SocialWrapper = styled.div`
  display: grid;

  justify-content: center;
  place-items: center;

  .kakao {
    background-color: #fff064;
    border-radius: 10px;
    border: none;
    padding: 0.3rem 2rem;
    font-weight: 100;
  }
`;

const Logo = styled.div`
  padding-left: 8px;
  padding-top: 58%;

  > span {
    font-weight: 200;
  }
`;

function Login() {
  const { login, setLogin } = useStore();
  const [modalCode, setModalCode] = useState(0);
  const refID = useRef(null);
  const refPassword = useRef(null);

  async function loginReq(e) {
    const payload = {
      Id: refID.current.value,
      password: refPassword.current.value,
    };

    // refID.current.value = "";
    // refPassword.current.value = "";

    try {
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/login", payload);
      console.log(resData.data.payload);

      const { name, age, job } = resData.data.payload;

      const loginSetting = {
        isLogin: true,
        accessToken: "SDFASDF",
        userInfo: resData.data.payload,
      };
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {makeModal(modalCode)}
      <LoginBG>
        <div className="std">
          <img src={`signupBg/IMG_${4976}.JPG`} alt={`bg`} />
          <p className="backText">"나무는 나무라지 않는다."</p>
        </div>
      </LoginBG>
      <LoginForm>
        <FontAwesomeIcon className="idIcon icon" icon={faUser} />
        <input ref={refID} className="inputId" placeholder="아이디를 입력하세요"></input>
        <FontAwesomeIcon className="passIcon icon" icon={faKey} />
        <input ref={refPassword} className="inputPass" placeholder="비밀번호를 입력하세요"></input>
        <span className="login textAni" onClick={loginReq}>
          Login
        </span>
        {login ? (
          <div />
        ) : (
          <span
            className="test textAni"
            onClick={async () => {
              await sleep(250);
              setLogin(true);
              setModalCode(101);
            }}>
            Test 계정
          </span>
        )}
        <div className="signup textAni">
          <Link to="/signup">
            <span className="signtext">회원가입</span>
          </Link>
        </div>
      </LoginForm>
      <BrWrapper>
        <hr className="hr" />
      </BrWrapper>
      <SocialWrapper>
        <button className="kakao">카카오톡으로 로그인</button>
      </SocialWrapper>
      <Logo className="logo">
        <span>Bud Buddy</span>
      </Logo>
    </div>
  );
}

export default Login;
