import React, { useState } from "react";
import styled from "styled-components";
import { SocialWrapper } from "../styles/pages/LoginStyled";
import { makeModal } from "../utils/errExeption";
import { proverbs } from "../utils/dummy";
import TextOnImg from "../components/TextOnImg";
import Hr from "../components/Hr";
import LoginForm from "../components/LoginForm";

const Layout = styled.div`
  padding-top: ${(props) => props.theme.backgroundPaddingTop};

  text-align: center;

  .loginText {
    color: white;
  }
`;

function Login() {
  const [modalCode, setModalCode] = useState(0);

  return (
    <Layout>
      {makeModal(modalCode)}
      <TextOnImg texts={proverbs} />
      <Hr t={3} b={1} width={70} />
      <div className="loginText">로그인</div>
      <LoginForm />
      <Hr t={0} b={3} width={70} />
      <SocialWrapper>
        <a
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`}
          className="kakao">
          <img src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_wide.png" alt="kakaoButton" />
        </a>
      </SocialWrapper>
    </Layout>
  );
}

export default Login;
