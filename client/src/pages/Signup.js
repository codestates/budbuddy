import React from "react";
import axios from "axios";

const Signup = () => {
  async function reqSingup(e) {
    e.preventDefault();

    const { userId, password, nickname } = e.target;
    const payload = {
      userId: userId.value,
      password: password.value,
      nickname: nickname.value,
    };

    try {
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/signup", payload);
      console.log("회원가입 응답::::", resData);
    } catch (err) {
      const err_code = Number(
        JSON.stringify(err.message)
          .split(" ")
          .pop()
          .replace(/[^0-9]/g, ""),
      );
      console.log("회원가입 err_code:", err_code);
    }
  }

  return (
    <div>
      <h1>버드버디</h1>
      <p>회원가입</p>
      <form
        onSubmit={(e) => {
          reqSingup(e);
        }}
      >
        <fieldset>
          <legend>회원 가입 정보를 입력해주세요</legend>
          <input type="text" placeholder="user id" name="userId" />
          <div />
          <input type="text" placeholder="password" name="password" />
          <div />
          <input type="text" placeholder="nick name" name="nickname" />
          {/* <textarea name="desc" placeholder="desc"></textarea> */}
          <div />
          <input type="submit" />
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;
