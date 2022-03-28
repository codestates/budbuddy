import React from "react";
import styled from "styled-components";

const SideBarContainer = styled.div`
  border: solid 1px black;
  width: 40%;
  min-height: 100vh;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  .hehe {
    height: 10vh;
    border: 1px solid red;
  }

  > .temp {
    margin: 10px;
    border: 1px solid red;
  }
`;

function SideBar() {
  return (
    <SideBarContainer class="sidebar">
      <div className="hehe">아이디</div>
      <div className="temp">배경이미지 세팅</div>
      <div className="temp">로그아웃</div>
      <div className="temp">비밀번호 변경</div>
      <div className="temp">회원탈퇴</div>
    </SideBarContainer>
  );
}

export default SideBar;
