import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Content = styled.nav`
  cursor: pointer;
  position: fixed;
  bottom: 0;
  z-index: 10;
  padding: 0.3rem;

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
  width: 100vw;
  @media screen and (min-width: 391px) {
    width: ${(props) => props.theme.webWidth};
  }

  .wrap {
    display: flex;
    justify-content: space-around;
  }
`;

function NavigationBar({ login = false }) {
  // console.log("NavigationBar::", login);
  return (
    <Content>
      <div className="wrap">
        <NavLink to="/test">
          <span className="test">테스트</span>
        </NavLink>
        <NavLink to="/">
          <span className="home">홈</span>
        </NavLink>
        <NavLink to="/story">
          <span className="story">스토리</span>
        </NavLink>
        {login ? (
          <NavLink to="/daily">
            <span className="daily">내 일지</span>
          </NavLink>
        ) : null}
        <NavLink to="/album">
          <span className="album">앨범</span>
        </NavLink>
        {login ? (
          <NavLink to="/mypage">
            <span className="login">내 정보</span>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <span className="login">로그인</span>
          </NavLink>
        )}
      </div>
    </Content>
  );
}

export default NavigationBar;
