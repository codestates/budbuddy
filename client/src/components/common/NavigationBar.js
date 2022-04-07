import React, { useRef } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import useLoginStore from "../../store/loginStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faDoorOpen, faAddressBook, faBook, faImage, faUser } from "@fortawesome/free-solid-svg-icons";

export const Content = styled.nav`
  width: 100vw;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  z-index: 5;
  padding: 0;
  margin: 0;
  background-color: ${(props) => props.theme.navigationBGColor};

  @media screen and (min-width: 391px) {
    width: ${(props) => props.theme.webWidth + "px"};
  }

  .wrap {
    display: flex;
    font-size: ${(props) => props.theme.fontWritePageLarge};

    .ani {
      flex-grow: 1;
      position: absolute;
      width: ${(props) => 100 / 5 + "%"};
      height: 100%;
      background: LightCoral;
      transition: all 0.3s ease 0s;
    }

    > a {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 7;
      .icon {
        width: 82px;
        color: dimgray;
        transform: translateY(10%);
      }
    }

    .link {
      position: relative;

      .tooltip {
        position: absolute;
        width: 100%;
        top: -47%;
        left: -20%;
        text-decoration: none;
        font-size: ${(props) => props.theme.fontToolTip};
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
  const naviRef = useRef(null);

  function moveNavi(curIdx) {
    naviRef.current.style.transform = `translateX(${curIdx * 100}%)`;
  }

  return (
    <Content>
      <form className="wrap">
        <NavLink to="/">
          <div
            className="link"
            onClick={() => {
              moveNavi(0);
            }}>
            <FontAwesomeIcon className="home icon" icon={faHouseUser} />
            <div className="tooltip">
              <span className="tooltiptext">Home</span>
            </div>
          </div>
        </NavLink>
        <NavLink to="/story">
          <div
            className="link"
            onClick={() => {
              moveNavi(1);
            }}>
            <FontAwesomeIcon className="story icon" icon={faAddressBook} />
            <div className="tooltip">
              <span className="tooltiptext">story</span>
            </div>
          </div>
        </NavLink>
        <NavLink to="/daily">
          <div
            className="link"
            onClick={() => {
              moveNavi(2);
            }}>
            <FontAwesomeIcon className="diary icon" icon={faBook} />
            <div className="tooltip">
              <span className="tooltiptext">diary</span>
            </div>
          </div>
        </NavLink>
        <NavLink to="/album">
          <div
            className="link"
            onClick={() => {
              moveNavi(3);
            }}>
            <FontAwesomeIcon className="album icon" icon={faImage} />
            <div className="tooltip">
              <span className="tooltiptext">album</span>
            </div>
          </div>
        </NavLink>
        {isLogin ? (
          <NavLink to="/mypage">
            <div
              className="link"
              onClick={() => {
                moveNavi(4);
              }}>
              <FontAwesomeIcon className="mypage icon" icon={faUser} />
              <div className="tooltip">
                <span className="tooltiptext">mypage</span>
              </div>
            </div>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <div
              className="link"
              onClick={() => {
                moveNavi(4);
              }}>
              <FontAwesomeIcon className="login icon" icon={faDoorOpen} />
              <div className="tooltip">
                <span className="tooltiptext">Login</span>
              </div>
            </div>
          </NavLink>
        )}
        <div ref={naviRef} className="ani"></div>
      </form>
    </Content>
  );
}

export default NavigationBar;
