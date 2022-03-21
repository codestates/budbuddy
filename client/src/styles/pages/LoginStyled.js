import styled from "styled-components";
import { BGWrapper } from "../CommonStyled";

export const BrWrapper = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;

  .hr {
    margin: 1.8rem;
    background-color: white;
    width: 600%;
  }
`;

export const LoginBG = styled(BGWrapper)`
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

export const LoginForm = styled.form`
  margin: 14% 3rem 0 3rem;
  padding: 1rem 1rem 0.4rem 1rem;
  background-color: ${(props) => props.theme.formColor};
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

export const SocialWrapper = styled.div`
  display: grid;

  justify-content: center;
  place-items: center;

  .kakao {
    background-color: #fff064;
    border-radius: 10px;
    border: none;
    padding: 0.3rem 2rem;
    font-weight: 100;
    transition: background-color 0.3s;
  }

  .kakao:hover {
    background-color: #ffd532;
  }
`;
