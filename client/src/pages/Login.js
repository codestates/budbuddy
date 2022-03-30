import React from "react";
import styled from "styled-components";
import { SocialWrapper } from "../styles/pages/LoginStyled";
import { proverbs } from "../utils/dummy";
import TextOnImg from "../components/common/TextOnImg";
import Hr from "../components/common/Hr";
import LoginForm from "../components/login/LoginForm";
import axios from "axios";

const Layout = styled.div`
  padding-top: ${(props) => props.theme.backgroundPaddingTop};

  text-align: center;

  .loginText {
    color: white;
  }
`;

function Login() {
  async function kakaoLogin() {
    try {
      const requestURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
      window.location.assign(requestURL);

      const resData = await axios.get(process.env.REACT_APP_API_URL + "/users/userinfo");

      if (resData.data.message === "ok") {
        const loginInfo = {
          isLogined: true,
          type: "kakao",
        };

        sessionStorage.setItem("loginInfo", JSON.stringify(loginInfo));
      }
    } catch (e) {
      console.log(e);
    }
  }

  //    window.location.assign(requestURL);
  //    sessionStorage.setItem('oauth', 'kakao');
  return (
    <Layout>
      <TextOnImg texts={proverbs} />
      <Hr t={5} b={1} width={90} />
      <div className="loginText">로그인</div>
      <LoginForm />
      <Hr t={0} b={4} width={90} />
      <SocialWrapper>
        <button onClick={kakaoLogin} className="kakao">
          카카오톡으로 로그인
        </button>
      </SocialWrapper>
    </Layout>
  );
}

export default Login;
