import React from "react";
import styled from "styled-components";

const SideBarContainer = styled.div`
  border: solid 1px black;
  width: 40%;
  min-height: 100vh;
  background-color: aliceblue;
  display: flex;
  align-self: flex-end;
  > .temp {
  }
`;

function SideBar() {
  return (
    <SideBarContainer class="sidebar">
      <ul className="temp">
        <a className="active" href="#home">
          Home
        </a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </ul>
    </SideBarContainer>
  );
}

export default SideBar;
