import styled from "styled-components";

export const SignupWrapper = styled.form`
  display: flex;
  flex-direction: column;

  text-align: center;
  place-items: center;

  background-color: ${(props) => props.theme.formColor};
  margin: 9% 15% 0 15%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius};

  .signupText {
    letter-spacing: 7px;
    color: black;
    margin-bottom: 0.3rem;
  }

  .hr {
    grid-area: hr;
    margin: 0.6rem 0 1rem 0;
  }

  .btn {
    border-radius: ${(props) => props.theme.borderRadius};
    border: none;
    background-color: MediumSeaGreen;

    color: white;
    padding: 3px;
    transition: background-color 0.3s;
  }

  .join:hover {
    background-color: ${(props) => props.theme.hoverColor};
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

  .btnbox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    > .join {
      width: 25%;
      margin-left: 10%;
    }
    > .cancle {
      width: 25%;
      margin-right: 10%;
    }
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
    margin-left: 0.5rem;
    height: 1.5rem;
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
    font-size: 14px;
    white-space: pre;
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
