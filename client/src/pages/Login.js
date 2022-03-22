import React, { useState } from "react";
import styled from "styled-components";
import { SocialWrapper, LoginForm } from "../styles/pages/LoginStyled";
import { BGWrapper } from "../styles/CommonStyled";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import useStore from "../store/store";
import { makeModal } from "../utils/errExeption";
import { sleep } from "../modules/sleep";
import { useNavigate } from "react-router-dom";
import Hr from "../components/Hr";

const LoginBg = styled(BGWrapper)`
  padding-top: ${(props) => props.theme.backgroundPaddingTop};
`;

function Login() {
  let navigate = useNavigate();
  const { login, setLogin } = useStore();
  const [modalCode, setModalCode] = useState(0);

  async function loginReq(e) {
    e.preventDefault();

    const { userId, password } = e.target;
    if (userId.value === "" || password.value === "") {
      setModalCode("reqfillLoginform");
      return;
    }

    const payload = {
      userId: userId.value,
      password: password.value,
    };

    try {
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/login", payload);
      // console.log("응답::::", resData.data);
      setModalCode(resData.data.message);
      if (resData.data.message === "ok") {
        setLogin(true);
        navigate("/mypage");
        return;
      }
    } catch (err) {
      console.log(err.response.data);
      setModalCode(err.response.data.message);
    }
  }

  return (
    <div>
      {makeModal(modalCode)}
      <LoginBg>
        <div className="std">
          <img src={`signupBg/IMG_${4976}.JPG`} alt={`bg`} />
          <p className="backText">"나무는 나무라지 않는다."</p>
        </div>
      </LoginBg>
      <LoginForm onSubmit={loginReq}>
        <FontAwesomeIcon className="idIcon icon" icon={faUser} />
        <input className="inputId" placeholder="아이디를 입력하세요" name="userId"></input>
        <FontAwesomeIcon className="passIcon icon" icon={faKey} />
        <input className="inputPass" placeholder="비밀번호를 입력하세요" name="password" type="password"></input>
        <button
          className="login textAni"
          type="submit"
          onBlur={() => {
            setModalCode(0);
          }}>
          Login
        </button>
        {login ? (
          <div />
        ) : (
          <span
            className="test textAni"
            onClick={async () => {
              await sleep(250);
              setLogin(true);
              setModalCode("testLogin");
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
      <Hr padding={3} width={90} />
      <SocialWrapper>
        <button className="kakao">카카오톡으로 로그인</button>
      </SocialWrapper>
    </div>
  );
}

export default Login;
