import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import useLoginStore from "../../store/LoginStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faUsers, faBook, faCamera, faUser } from "@fortawesome/free-solid-svg-icons";

export const Content = styled.nav`
  cursor: pointer;
  position: fixed;
  bottom: 0;
  z-index: 10;
  padding: 0.4rem;

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
    width: ${(props) => props.theme.webWidth + "px"};
  }

  .wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.5rem;

    .link {
      position: relative;

      .icon {
        color: dimgray;
        transform: translateY(10%);
        transition: color 0.25s ease;
      }

      .icon:hover {
        color: LightCoral;
      }

      .tooltip {
        position: absolute;
        width: 100%;
        top: -47%;
        left: -20%;
        text-decoration: none;
        font-size: 0.8rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        .tooltiptext {
          font-family: sans-serif;
          color: white;
          background-color: black;
          border: 1px solid black;
          border-radius: ${(props) => props.theme.borderRadius};
          padding: 0 0.3rem 0.2rem 0.3rem;
          position: absolute;
          transition: all 0.3s ease;
          opacity: 0;
        }
      }
    }

    .link:hover .tooltiptext {
      opacity: 1;
    }
  }
`;

function NavigationBar() {
  const { isLogin } = useLoginStore();
  return (
    <Content>
      <div className="wrap">
        <NavLink to="/test">
          <span className="test">테스트</span>
        </NavLink>
        <NavLink to="/">
          <div className="link">
            <FontAwesomeIcon className="home icon" icon={faHouseUser} />
            <div className="tooltip">
              <span className="tooltiptext">Home</span>
            </div>
          </div>
        </NavLink>
        <NavLink to="/story">
          <div className="link">
            <FontAwesomeIcon className="story icon" icon={faUsers} />
            <div className="tooltip">
              <span className="tooltiptext">story</span>
            </div>
          </div>
        </NavLink>
        {isLogin ? (
          <NavLink to="/daily">
            <div className="link">
              <FontAwesomeIcon className="diary icon" icon={faBook} />
              <div className="tooltip">
                <span className="tooltiptext">diary</span>
              </div>
            </div>
          </NavLink>
        ) : null}
        <NavLink to="/album">
          <div className="link">
            <FontAwesomeIcon className="album icon" icon={faCamera} />
            <div className="tooltip">
              <span className="tooltiptext">album</span>
            </div>
          </div>
        </NavLink>
        {isLogin ? (
          <NavLink to="/mypage">
            <div className="link">
              <FontAwesomeIcon className="mypage icon" icon={faUser} />
              <div className="tooltip">
                <span className="tooltiptext">mypage</span>
              </div>
            </div>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <div className="link">
              <FontAwesomeIcon className="login icon" icon={faUser} />
              <div className="tooltip">
                <span className="tooltiptext">Login</span>
              </div>
            </div>
          </NavLink>
        )}
      </div>
    </Content>
  );
}

export default NavigationBar;
