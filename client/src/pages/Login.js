import React, { useState } from "react";
import { SocialWrapper, BrWrapper, LoginBG, LoginForm } from "../styles/pages/LoginStyled";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import useStore from "../store/store";
import { sleep, makeModal } from "../utils/errExeption";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const { login, setLogin } = useStore();
  const [modalCode, setModalCode] = useState(0);

  async function loginReq(e) {
    e.preventDefault();
    const { userId, password } = e.target;

    const payload = {
      userId: userId.value,
      password: password.value,
    };

    try {
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/login", payload);
      // console.log("응답::::", resData.data);
      setModalCode(resData.data.message);

      if (resData.data.message === "ok") {
        setLogin(true);
        navigate("/mypage");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {makeModal(modalCode)}
      <LoginBG>
        <div className="std">
          <img src={`signupBg/IMG_${4976}.JPG`} alt={`bg`} />
          <p className="backText">"나무는 나무라지 않는다."</p>
        </div>
      </LoginBG>
      <LoginForm onSubmit={loginReq}>
        <FontAwesomeIcon className="idIcon icon" icon={faUser} />
        <input className="inputId" placeholder="아이디를 입력하세요" name="userId"></input>
        <FontAwesomeIcon className="passIcon icon" icon={faKey} />
        <input className="inputPass" placeholder="비밀번호를 입력하세요" name="password" type="password"></input>
        <button
          className="login textAni"
          type="submit"
          onBlur={() => {
            setModalCode(0);
          }}>
          Login
        </button>
        {login ? (
          <div />
        ) : (
          <span
            className="test textAni"
            onClick={async () => {
              await sleep(250);
              setLogin(true);
              setModalCode("testLogin");
            }}>
            Test 계정
          </span>
        )}
        <div className="signup textAni">
          <Link to="/signup">
            <span className="signtext">회원가입</span>
          </Link>
        </div>
      </LoginForm>
      <BrWrapper>
        <hr className="hr" />
      </BrWrapper>
      <SocialWrapper>
        <button className="kakao">카카오톡으로 로그인</button>
      </SocialWrapper>
    </div>
  );
}

export default Login;
