import React from "react";

const Signup = () => {
  function reqSingup(e) {
    e.preventDefault();

      for(let i=1; i<e.currentTarget.length-1; i++){
       
        console.log("회원가입진행:",e.currentTarget[i].value);
      }

    console.log(e.target.userId.value);
    console.log(e.target.password.value);
    console.log(e.target.nickname.value);

  }

  return (
    <div>
      <h1>버드버디</h1>
      <p>회원가입</p>
      <form onSubmit={(e) => { reqSingup(e);}} >
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
