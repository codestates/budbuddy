import styled from "styled-components";

export const SignupWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  text-align: center;

  background-color: ${(props) => props.theme.formColor};
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius};

  .signupText {
    font-size: ${(props) => props.theme.fontWritePageMid};
    letter-spacing: 7px;
    color: black;
    margin-bottom: 0.3rem;
  }

  .hr {
    display: flex;
    justify-content: center;
    margin: 0rem 0rem 1.5rem 0;
  }

  .btn {
    border-radius: ${(props) => props.theme.borderRadius};
    border: none;
    background-color: MediumSeaGreen;

    color: white;
    padding: 3px;
    transition: background-color 0.3s;
    margin-bottom: 1rem;
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
    background-color: ${(props) => props.theme.hoverCancleColor};
    color: white;
  }

  .btnbox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    > .join {
      font-size: ${(props) => props.theme.fontWritePageSmall};
      width: 25%;
      margin-left: 10%;
    }
    > .cancle {
      font-size: ${(props) => props.theme.fontWritePageSmall};
      width: 25%;
      margin-right: 10%;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  text-align: center;
  place-items: center;

  input {
    font-size: ${(props) => props.theme.fontWritePageXSmall};
    border: none;
    width: 100%;
    height: 1.5rem;
    border-radius: ${(props) => props.theme.borderRadius};
  }

  .item1 {
    display: flex;
    width: 100%;
    place-items: center;
    .idIcon {
      margin: 0 1rem;
    }
    > input {
      width: 75%;
    }
  }

  .item2 {
    place-items: center;
    display: flex;
    width: 100%;

    > .passIcon {
      margin: 0 1rem;
    }

    > input {
      width: 75%;
    }
  }

  .item3 {
    place-items: center;
    display: flex;
    width: 100%;

    > .nickIcon {
      margin: 0 1rem;
    }

    > input {
      width: 75%;
    }
  }

  > * {
    margin-bottom: ${(props) => props.theme.signupInputLineHeight};
  }

  .icon {
    width: 6%;
    font-size: 30px;
    filter: invert(85%) sepia(90%) saturate(400%) hue-rotate(130deg) brightness(95%) contrast(50%);
  }

  *::placeholder {
    color: ${(props) => props.theme.placeholderColor};
    opacity: 0.5;
    padding-left: 1rem;
  }

  .ch {
    font-size: ${(props) => props.theme.fontToolTip};
    white-space: pre;
  }

  .invalid {
    color: ${(props) => props.theme.textWaringColor};
  }
`;
