import React, { useRef } from "react";
import styled from "styled-components";
import axios from "axios";

export const Content = styled.div``;

axios.defaults.withCredentials = true;

function App() {
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
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/login", payload);
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
    <div className="App">
      <Content>
        <h1>버드버디 시작!</h1>
        <span>ID: </span>
        <input ref={refID} className="" placeholder="test"></input>
        <div></div>
        <span>Password: </span>
        <input ref={refPassword} className="" placeholder="1111"></input>
        <div></div>
        <button className="login" onClick={loginReq}>
          로그인
        </button>
      </Content>
    </div>
  );
}

export default App;
