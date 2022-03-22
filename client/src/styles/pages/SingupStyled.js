import styled from "styled-components";

export const SignupWrapper = styled.form`
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

  background-color: ${(props) => props.theme.formColor};
  margin: 15% 10% 0 10%;
  padding-top: 4%;
  padding-bottom: 4%;
  border-radius: ${(props) => props.theme.borderRadius};

  .signupText {
    grid-area: signupText;
    margin-bottom: 1.3rem;
    letter-spacing: 7px;
    color: black;
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

  .join:hover {
    background-color: Teal;
    color: black;
  }

  .cancle {
    grid-area: cancle;
    background-color: Gainsboro;
    color: black;
  }

  .cancle:hover {
    background-color: IndianRed;
    color: white;
  }
`;

export const InputWrapper = styled.div`
  grid-area: inputWrapper;

  display: grid;
  grid-template-columns: minmax(1fr, auto) minmax(9fr, auto);
  grid-template-rows: repeat(6, minmax(1fr, auto));
  grid-template-areas:
    "chEmail chEmail"
    "idIcon inputId"
    "chPass chPass"
    "passIcon inputPass"
    "chNick chNick"
    "nickIcon inputNick";

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

    @media screen and (min-width: 390px) {
      font-size: 1rem;
    }

    @media screen and (min-width: 520px) {
      font-size: 1.3rem;
    }
  }

  > .invalid {
    color: ${(props) => props.theme.textWaringColor};
  }

  > .chEmail {
    grid-area: chEmail;
  }

  > .chPass {
    grid-area: chPass;
  }

  > .chNick {
    grid-area: chNick;
  }
`;
