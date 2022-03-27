import React from "react";
import styled from "styled-components";

const SideBarContainer = styled.div`
  position: fixed;
  right: 200px;
  bottom: 0;
  padding: 0;
  width: 300px;
  height: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: default;

  > .sidebar a {
    display: block;
    color: black;
    padding: 16px;
    text-decoration: none;
  }

  > .sidebar a.active {
    background-color: #04aa6d;
    color: white;
  }

  > .sidebar a:hover:not(.active) {
    background-color: #555;
    color: white;
  }
`;

function SideBar() {
  return (
    <SideBarContainer class="sidebar">
      <a class="active" href="#home">
        Home
      </a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </SideBarContainer>
  );
}

export default SideBar;
