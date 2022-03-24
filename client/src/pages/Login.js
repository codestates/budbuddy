import React, { useState } from "react";
import styled from "styled-components";
import { SocialWrapper } from "../styles/pages/LoginStyled";
import { makeModal } from "../utils/errExeption";
import { proverbs } from "../utils/dummy";
import TextOnImg from "../components/TextOnImg";
import Hr from "../components/Hr";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

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
      <Hr t={5} b={1} width={90} />
      <div className="loginText">로그인</div>
      <LoginForm />
      <Hr t={0} b={4} width={90} />
      <SocialWrapper>
        <Link to={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`}>
          <button className="kakao">카카오톡으로 로그인</button>
        </Link>
      </SocialWrapper>
    </Layout>
  );
}

export default Login;
