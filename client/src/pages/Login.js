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
        <button className="kakao">카카오톡으로 로그인</button>
      </SocialWrapper>
    </Layout>
  );
}

export default Login;
