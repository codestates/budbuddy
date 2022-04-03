import styled from "styled-components";

export const LoginForm = styled.form`
  margin: 8% 3rem 0 3rem;
  padding: 1rem 1rem 0.4rem 1rem;
  background-color: ${(props) => props.theme.formColor};

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1fr, auto));
  grid-template-rows: repeat(3, minmax(1fr, 100%)) minmax(0.5fr, 100%);
  grid-template-areas:
    "idIcon inputId inputId inputId inputId inputId"
    "passIcon inputPass inputPass inputPass inputPass inputPass"
    ". login login . test ."
    ". . . . . signup";

  justify-content: start;
  align-items: end;

  > * {
    border-radius: ${(props) => props.theme.borderRadius};
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
    margin-top: 25%;
    grid-area: test;
  }

  .signup {
    grid-area: signup;
    padding: 0;
    margin-top: 1rem;
  }

  .signtext {
  }

  .textAni {
    transition: all 0.2s cubic-bezier(0, 1.23, 1, 0.55);
    background-color: Gainsboro;
    color: black;
    padding: 0.3rem;
  }

  .textAni:hover {
    background-color: ${(props) => props.theme.hoverColor};
    color: white;
  }

  a {
    color: black;
  }
`;

export const SocialWrapper = styled.div`
  display: grid;

  justify-content: center;
  place-items: center;
  border: none;

  .kakao {
    border: none;
    border-radius: ${(props) => props.theme.borderRadius};
    padding: 4px 10px;
    font-size: ${(props) => props.theme.fontWritePageMid};
    color: #000000;
    background-color: #f9e000;
    text-decoration: none;
    opacity: 1;
    -webkit-transition: background-color 0.25s ease;
    transition: background-color 0.25s ease;
  }

  .kakao:hover {
    background-color: #dd9b25;
  }
`;
