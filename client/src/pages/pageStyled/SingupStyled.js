import styled from "styled-components";

export const Content = styled.div`
  background-color: ${(props) => props.theme.mainColor};
`;

export const BGWrapper = styled.div`
  display: grid;

  height: 30%;
  text-align: center;
  position: relative;

  box-shadow: 15px 15px 7px ${(props) => props.theme.boxShadowColor};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(1px);
    border: none;
  }

  .backText {
    position: absolute;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: pre;

    font-size: ${(props) => props.theme.fontSizeBg};
    font-weight: ${(props) => props.theme.fontWeightBg};
    color: MintCream;

    > h1 {
      text-transform: uppercase;
      outline: 3px solid white;
      outline-offset: 0.3em;
      display: inline-block;
      margin: 0.4em 0 0.5em;
    }

    > h1 > span {
      color: MintCream;
      text-transform: capitalize;
      font-weight: 0;
    }

    .green {
      color: green;
    }
  }
`;

export const SignupWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(1fr, auto));
  grid-template-rows: minmax(1fr, auto) minmax(3fr, auto) minmax(0.1fr, auto) minmax(1fr, auto);
  grid-template-areas:
    "signupText signupText signupText"
    "inputWrapper inputWrapper inputWrapper"
    "hr hr hr"
    "test join cancle";

  text-align: center;
  align-items: center;
  place-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.subColor};
  margin: 0 10% 0 10%;
  padding-top: 4%;
  padding-bottom: 4%;
  border-radius: ${(props) => props.theme.borderRadius};

  .signupText {
    grid-area: signupText;
    margin-bottom: 1.3rem;
    font-size: 2rem;
    letter-spacing: 7px;
    color: Snow;
  }

  .hr {
    grid-area: hr;
    margin: 0.6rem 0 1rem 0;

    background-color: GhostWhite;
  }

  .btn {
    border-radius: ${(props) => props.theme.borderRadius};
    border: none;
    background-color: MediumSeaGreen;

    color: white;
    padding: 6px;
    font-size: 20px;
    transition: background-color 0.3s;
  }

  .join {
    grid-area: join;
  }

  .join:active {
    background-color: Teal;
    color: black;
  }

  .test {
    grid-area: test;
  }

  .test:active {
    background-color: Teal;
    color: black;
  }

  .cancle {
    grid-area: cancle;
    background-color: IndianRed;
  }

  .cancle:active {
    background-color: LightPink;
    color: black;
  }
`;

export const InputWrapper = styled.div`
  grid-area: inputWrapper;

  display: grid;
  grid-template-columns: minmax(1fr, auto) minmax(9fr, auto);
  grid-template-rows: repeat(6, minmax(1fr, auto));
  grid-template-areas:
    "idIcon inputId"
    "chId chId"
    "passIcon inputPass"
    "chPass chPass"
    "nickIcon inputNick"
    "chNick chNick";

  justify-content: center;
  text-align: center;
  place-items: center;

  input {
    border: none;
    margin-left: 1rem;
    height: 2.1rem;
    border-radius: ${(props) => props.theme.borderRadius};
    padding-left: 1rem;
    font-size: 20px;
  }

  > * {
    margin-bottom: ${(props) => props.theme.signupInputLineHeight};
  }

  > .icon {
    font-size: 22px;
    filter: invert(85%) sepia(90%) saturate(400%) hue-rotate(130deg) brightness(95%) contrast(50%);
  }

  > .idIcon {
    grid-area: idIcon;
  }
  > .inputId {
    grid-area: inputId;
  }

  > .passIcon {
    grid-area: passIcon;
  }

  > .nickIcon {
    grid-area: nickIcon;
  }
  > .inputPass {
    grid-area: inputPass;
  }

  > .inputNick {
    grid-area: inputNick;
  }

  > *::placeholder {
    color: ${(props) => props.theme.placeholderColor};
    opacity: 0.5;
  }

  > .ch {
    font-size: 12px;
    white-space: pre;
  }

  > .invalid {
    color: ${(props) => props.theme.textWaringColor};
  }

  > .chId {
    grid-area: chId;
  }

  > .chPass {
    grid-area: chPass;
  }

  > .chNick {
    grid-area: chNick;
  }
`;
