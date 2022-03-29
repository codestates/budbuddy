import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRotate, faLock, faEraser } from "@fortawesome/free-solid-svg-icons";
import SideBarStore from "../../store/SideBarStore";
import AccountDelete from "./AccountDelete";
import ChangePassword from "./ChangePassword";

const Content = styled.div`
  .logout {
    height: 5vh;
    margin: 15px;
    text-align: center;
    line-height: 5vh;
    display: flex;
    .logoutButton {
      margin: 10px;
      font-size: 1rem;
      background-color: transparent;
      cursor: pointer;
      border: none;
      color: ${(props) => props.theme.calendarBottomColor};
    }
  }
  .pictureChange {
    height: 5vh;
    margin: 15px;
    text-align: center;
    line-height: 5vh;
    display: flex;
    .pictureChangeButton {
      margin: 10px;
      font-size: 1rem;
      background-color: transparent;
      cursor: pointer;
      border: none;
      color: ${(props) => props.theme.calendarBottomColor};
    }
  }
  .pwChange {
    height: 5vh;
    margin: 15px;
    text-align: center;
    line-height: 5vh;
    display: flex;
    .pwChangeButton {
      margin: 10px;
      font-size: 1rem;
      background-color: transparent;
      cursor: pointer;
      border: none;
      color: ${(props) => props.theme.calendarBottomColor};
    }
  }
  .DeleteAccount {
    height: 5vh;
    margin: 15px;
    text-align: center;
    line-height: 5vh;
    display: flex;
    .DeleteAccountButton {
      font-size: 1rem;
      margin: 10px;
      background-color: transparent;
      cursor: pointer;
      border: none;
      color: ${(props) => props.theme.calendarBottomColor};
    }
  }
`;

function SideBarFunctions({ setModalCode }) {
  const [isDelAccount, setDelAccount] = useState(false);
  const [isChangePassword, setChangePassword] = useState(false);
  const logOutFunction = () => {
    setModalCode("logoutSuccessfully");
  };
  const DelAccountFunction = () => {
    setDelAccount((current) => !current);
  };
  const ChangePasswordFunction = () => {
    setChangePassword((current) => !current);
  };
  return (
    <Content>
      {isChangePassword ? <ChangePassword open={isChangePassword} closeFn={setChangePassword} setModalCode={setModalCode} /> : null}
      {isDelAccount ? <AccountDelete open={isDelAccount} closeFn={setDelAccount} setModalCode={setModalCode} /> : null}
      <div className="logout">
        <FontAwesomeIcon className="fa-solid fa-user fa-2x" icon={faUser} color="snow" />
        <button className="logoutButton" onClick={logOutFunction}>
          로그아웃
        </button>
      </div>
      <div className="pictureChange">
        <FontAwesomeIcon className="fa-solid fa-arrows-rotate fa-2x fa-spin" icon={faRotate} color="snow" />
        <button className="pictureChangeButton">이미지 교체</button>
      </div>
      <div className="pwChange">
        <FontAwesomeIcon className="fa-solid fa-lock fa-2x" icon={faLock} color="snow" />
        <button onClick={ChangePasswordFunction} className="pwChangeButton">
          비밀번호 변경
        </button>
      </div>
      <div className="DeleteAccount">
        <FontAwesomeIcon className="fa-solid fa-eraser fa-2x" icon={faEraser} color="snow" />
        <button onClick={DelAccountFunction} className="DeleteAccountButton">
          회원탈퇴
        </button>
      </div>
    </Content>
  );
}

export default SideBarFunctions;
