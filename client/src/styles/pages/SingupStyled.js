import styled from "styled-components";

export const SignupWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(1fr, auto));
  grid-template-rows: minmax(1fr, auto) minmax(3fr, auto) minmax(0.1fr, auto) minmax(1fr, auto);
  grid-template-areas:
    "signupText signupText signupText"
    "inputWrapper inputWrapper inputWrapper"
    "hr hr hr"
    "join join cancle";

  text-align: center;
  align-items: center;
  place-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.subColor};
  margin: 15% 10% 0 10%;
  padding-top: 4%;
  padding-bottom: 4%;
  border-radius: ${(props) => props.theme.borderRadius};

  .signupText {
    grid-area: signupText;
    margin-bottom: 1.3rem;
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
    transition: background-color 0.3s;
  }

  .join {
    grid-area: join;
  }

  .join:active {
    background-color: Teal;
    color: black;
  }

  .cancle {
    grid-area: cancle;
    background-color: Gainsboro;
    color: black;
  }

  .cancle:active {
    background-color: IndianRed;
    color: white;
  }
`;

export const InputWrapper = styled.form`
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
  }

  > * {
    margin-bottom: ${(props) => props.theme.signupInputLineHeight};
  }

  > .icon {
    font-size: ${(props) => props.theme.fontIconSize};
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
