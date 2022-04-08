import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faLockOpen, faEraser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import AccountDelete from "./AccountDelete";
import ChangePassword from "./ChangePassword";
import useLoginStore from "../../store/loginStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();
  const { setLogin, setImage } = useLoginStore();
  const [isDelAccount, setDelAccount] = useState(false);
  const [isChangePassword, setChangePassword] = useState(false);
  const [lockIcon, setLockIcon] = useState(false);
  const [logoutIcon, setLogoutIcon] = useState(false);
  const logOutFunction = async () => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/users/logout");
      setImage("");
      setLogin(false);
      navigate("/");
    } catch (err) {
      setImage("");
      setLogin(false);
      navigate("/");
    }
  };
  const DelAccountFunction = () => {
    setDelAccount((current) => !current);
  };
  const ChangePasswordFunction = () => {
    setChangePassword((current) => !current);
  };
  const ChangeLockIcon = () => {
    setLockIcon((current) => !current);
  };
  const ChangeLogoutIcon = () => {
    setLogoutIcon((current) => !current);
  };
  return (
    <Content>
      {isChangePassword ? <ChangePassword open={isChangePassword} closeFn={setChangePassword} setModalCode={setModalCode} /> : null}
      {isDelAccount ? <AccountDelete open={isDelAccount} closeFn={setDelAccount} setModalCode={setModalCode} /> : null}
      <div className="logout">
        <FontAwesomeIcon className="fa-solid fa-user fa-2x" icon={logoutIcon ? faRightFromBracket : faUser} color="snow" />
        <button className="logoutButton" onClick={logOutFunction} onMouseEnter={ChangeLogoutIcon} onMouseOut={ChangeLogoutIcon}>
          로그아웃
        </button>
      </div>
      <div className="pwChange">
        <FontAwesomeIcon className="fa-solid fa-lock fa-2x" icon={lockIcon ? faLockOpen : faLock} color="snow" />
        <button onClick={ChangePasswordFunction} className="pwChangeButton" onMouseEnter={ChangeLockIcon} onMouseOut={ChangeLockIcon}>
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
