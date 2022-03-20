import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import useStore from "../../store/store";

export const Content = styled.nav`
  cursor: pointer;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;

  display: grid;
  grid-template-columns: repeat(5, minmax(1fr, auto));
  grid-template-rows: minmax(1fr, auto);
  grid-template-areas: "home story daily album login";

  justify-content: space-evenly;
  font-size: 25px;
  padding: 0.5rem;

  background-color: ${(props) => props.theme.navigationBGColor};

  a {
    color: black;
    transition: color 0.25s cubic-bezier(0, 1.23, 1, 0.55);
  }
  a:hover {
    color: white;
  }
  /* a:active {
    color: black;
  } */
`;

function NavigationBar() {
  const { login } = useStore();

  return (
    <Content>
      <NavLink to="/">
        <span className="home">홈</span>
      </NavLink>
      <NavLink to="/story">
        <span className="story">스토리</span>
      </NavLink>
      <NavLink to="/daily">
        <span className="daily">내 일지</span>
      </NavLink>
      <NavLink to="/album">
        <span className="album">앨범</span>
      </NavLink>
      {login ? (
        <span className="login">내 정보</span>
      ) : (
        <NavLink to="/login">
          <span className="login">로그인</span>
        </NavLink>
      )}
    </Content>
  );
}

export default NavigationBar;
