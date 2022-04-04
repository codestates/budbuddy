import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { validNickName } from "../../modules/validation";

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  text-align: center;
  top: 50%;
  left: 0%;

  transform: translate(-50%, -50%);

  .background {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    @media screen and (min-width: 391px) {
      width: ${(props) => props.theme.webWidth + "px"};
    }
  }

  .popup {
    border-radius: ${(props) => props.theme.borderRadius};
    width: 85%;
    padding: 2%;
    background-color: #f5f5f5;
    box-sizing: border-box;
    z-index: 2;
    opacity: 0;
    position: relative;
    transition: all 0.15s ease-in-out;
    top: 10px;
  }

  .popup.active {
    opacity: 1;
    top: 0;
  }

  .popup .title {
    margin: 5px 0px;
  }

  .popup .desc {
    color: #222;
  }

  .popup .trans {
    position: relative;
    top: 10px;
    opacity: 0;
  }
  .popup.active .trans {
    top: 0px;
    opacity: 1;
    transition: all 0.2s ease-in-out;
  }
  .open {
    margin-top: 3rem;
  }
`;

const FormLayout = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  .title {
    font-size: 0.8rem;
    align-self: center;
  }
  .budname {
    font-size: 0.6rem;
    align-self: start;
    display: flex;
    flex-direction: row;

    > .icon {
      font-size: 10px;
      margin-right: 4px;
    }
  }
  .desc-photo {
    font-size: 0.6rem;
    align-self: start;
  }
  .input-bud {
    border: none;
    margin: 3px 0;
    padding-left: 0.5rem;
  }

  .btn-wrapper {
    display: flex;
    justify-content: space-around;
    margin-top: 3px;
  }

  .btn {
    margin: 0;
    border: none;
    outline: none;
    border-radius: ${(props) => props.theme.borderRadius};
    cursor: pointer;
    padding: 1px 3px;
    margin: 0;
  }

  .open:hover {
    color: snow;
    background-color: ${(props) => props.theme.hoverColor};
  }
  .close:hover {
    color: snow;
    background-color: IndianRed;
  }

  .chNick {
    font-size: 0.9rem;
    padding: 4px;
    white-space: pre;
  }
  .passwordCover {
    display: grid;
    grid-template-rows: repeat(2, minmax(1fr, auto));
    grid-template-columns: repeat(3, minmax(1fr, auto));
    grid-template-areas:
      " currentPasswordDiv currentPasswordInput currentPasswordInput currentPasswordInput "
      " newPasswordDiv newPasswordInput newPasswordInput newPasswordInput "
      " checkPasswordDiv checkPasswordInput checkPasswordInput checkPasswordInput ";
    .currentPasswordDiv {
      grid-area: currentPasswordDiv;
      margin: 5px;
    }
    .currentPasswordInput {
      grid-area: currentPasswordInput;
      margin: 5px;
      border: none;
    }
    .newPasswordDiv {
      grid-area: newPasswordDiv;
      margin: 5px;
    }
    .newPasswordInput {
      grid-area: newPasswordInput;
      margin: 5px;
      border: none;
    }
    .checkPasswordDiv {
      grid-area: checkPasswordDiv;
      margin: 5px;
    }
    .checkPasswordInput {
      grid-area: checkPasswordInput;
      margin: 5px;
      border: none;
    }
  }
  > .invalid {
    color: ${(props) => props.theme.textWaringColor};
  }
  > .right {
    color: green;
  }
`;

//closeFn requied이기 때문에 디폴트 값을 안넣음
const ChangePassword = ({ open = true, closeFn, setModalCode = "" }) => {
  const checkNick = useRef(null);
  const popRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    if (open) {
      popRef.current.className = "popup active";
      backRef.current.style.backgroundColor = `rgb(0, 0, 0, 0.4)`;
    }
  }, [open]);

  const [isnewPassword, setNewPassword] = useState("");

  const NewPasswordFunction = (e) => {
    setNewPassword(e.target.value);
    console.log(isnewPassword);
  };

  function resisterBud(e) {
    e.preventDefault();
    console.log(e);

    setModalCode("PasswordReplaced");
    ClosePopup();
  }

  function ClosePopup() {
    closeFn(false);
    popRef.current.className = "popup";
  }

  function onChange(e) {
    const isValid = e.target.value === isnewPassword;
    if (!isValid) {
      checkNick.current.textContent = "비밀번호가 맞지 않습니다.";
      checkNick.current.className = "chNick ch invalid";
    } else {
      checkNick.current.textContent = `비밀번호가 맞습니다. \n 확인을 누르면 비밀번호가 변경됩니다.`;
      checkNick.current.className = "chNick ch right";
    }
  }

  function onBlur(e) {
    if (e.target.value !== "") {
      return;
    }

    checkNick.current.textContent = "";
    checkNick.current.className = "chNick ch";
  }

  return (
    <Layout>
      <div ref={backRef} className="background">
        <div ref={popRef} className={`popup`}>
          <FormLayout onSubmit={resisterBud}>
            <div className="title trans">비밀번호 바꾸기</div>
            <div className="budname trans">
              <FontAwesomeIcon className="icon" icon={faSeedling} color="green" />
              <div className="text">Bud Buddy</div>
            </div>
            <div ref={checkNick} className="chNick ch"></div>
            <div className="passwordCover">
              <div className="currentPasswordDiv">현재 비밀번호</div>
              <input className="currentPasswordInput" placeholder="현재 비밀번호" type="password"></input>
              <div className="newPasswordDiv">새 비밀번호</div>
              <input className="newPasswordInput" placeholder="새 비밀번호" type="password" value={isnewPassword} onChange={(e) => NewPasswordFunction(e)}></input>
              <div className="checkPasswordDiv">새 비밀번호 확인</div>
              <input className="checkPasswordInput" placeholder="새 비밀번호 확인" type="password" onChange={onChange} onBlur={onBlur}></input>
            </div>
            <div className="btn-wrapper trans">
              <button className="open btn trans" type="submit">
                완료
              </button>
              <button className="close btn trans" onClick={ClosePopup} type="button">
                취소
              </button>
            </div>
          </FormLayout>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
