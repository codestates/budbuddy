import React, { useRef } from "react";
import axios from "axios";

function Login() {
  const refID = useRef(null);
  const refPassword = useRef(null);

  async function loginReq(e) {
    const payload = {
      Id: refID.current.value,
      password: refPassword.current.value,
    };

    // refID.current.value = "";
    // refPassword.current.value = "";

    try {
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/login", payload);
      console.log(resData.data.payload);

      const { name, age, job } = resData.data.payload;

      const loginSetting = {
        isLogin: true,
        accessToken: "SDFASDF",
        userInfo: resData.data.payload,
      };
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>버드버디 시작!</h1>
      <p>이곳은 로그인 페이지입니다.</p>
      <span>ID: </span>
      <input ref={refID} className="" placeholder="test"></input>
      <div></div>
      <span>Password: </span>
      <input ref={refPassword} className="" placeholder="1111"></input>
      <div></div>
      <button className="login" onClick={loginReq}>
        로그인
      </button>
    </div>
  );
}

export default Login;
