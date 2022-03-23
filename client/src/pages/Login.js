import React, { useState } from "react";
import styled from "styled-components";
import { SocialWrapper, LoginForm } from "../styles/pages/LoginStyled";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import useStore from "../store/store";
import { makeModal } from "../utils/errExeption";
import { sleep } from "../modules/sleep";
import { useNavigate } from "react-router-dom";
import { proverbs } from "../utils/dummy";
import TextOnImg from "../components/TextOnImg";
import Hr from "../components/Hr";

const Layout = styled.div`
  padding-top: ${(props) => props.theme.backgroundPaddingTop};
`;

function Login() {
  let navigate = useNavigate();
  const { login, setLogin } = useStore();
  const [modalCode, setModalCode] = useState(0);

  async function loginReq(e) {
    e.preventDefault();
    // console.log("호출");
    const { email, password } = e.target;
    if (email.value === "" || password.value === "") {
      setModalCode("reqfillLoginform");
      return;
    }

    const payload = {
      email: email.value,
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
    <Layout>
      {makeModal(modalCode)}
      <TextOnImg texts={proverbs} />
      <LoginForm onSubmit={loginReq}>
        <FontAwesomeIcon className="idIcon icon" icon={faUser} />
        <input className="inputId" placeholder="이메일을 입력하세요" name="email"></input>
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
          <button
            className="test textAni"
            onClick={async () => {
              await sleep(250);
              setLogin(true);
              setModalCode("testLogin");
            }}>
            Test 계정
          </button>
        )}
        <div className="signup">
          <Link to="/signup">
            <span className="signtext">회원가입</span>
          </Link>
        </div>
      </LoginForm>
      <Hr padding={3} width={90} />
      <SocialWrapper>
        <button className="kakao">카카오톡으로 로그인</button>
      </SocialWrapper>
    </Layout>
  );
}

export default Login;
