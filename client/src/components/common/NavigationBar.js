import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import useLoginStore from "../../store/loginStore";
import { useNaviStore } from "../../store/timeStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faDoorOpen, faAddressBook, faBook, faImage, faUser } from "@fortawesome/free-solid-svg-icons";

const Content = styled.nav`
  width: 100vw;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  z-index: 5;
  padding: 0;
  margin: 0;
  background-color: ${(props) => props.theme.navigationBGColor};

  @media screen and (min-width: ${(props) => props.theme.webWidth + 1 + "px"}) {
    width: ${(props) => props.theme.webWidth + "px"};
  }

  .wrap {
    display: flex;
    width: 100%;
    font-size: ${(props) => props.theme.fontWritePageLarge};

    .ani {
      flex-grow: 1;
      position: absolute;
      width: 20%;
      height: 100%;
      background: LightCoral;
      transition: all 0.5s ease 0s;
      transform: translateX(${(props) => props.idx * 100 + "%"});
    }

    > a {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 7;
      width: 20%;
      height: 100%;

      .icon {
        color: dimgray;
        transform: translateY(10%);
      }
    }

    .link {
      position: relative;
      transition: background-color 0.3s ease;
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
          transition: opacity 0.3s ease;
          opacity: 0;
        }
      }
    }

    .link:hover .tooltiptext {
      opacity: 1;
    }
    .link:hover {
      background-color: rgba(255, 138, 80, 1);
    }
  }
`;

function NavigationBar() {
  const { isLogin } = useLoginStore();
  const { idx, setIdx } = useNaviStore();
  const naviRef = useRef(null);

  useEffect(() => {
    naviRef.current.style.transform = `translateX(${idx * 100}%)`;
  }, []);

  function moveNavi(curIdx) {
    naviRef.current.style.transform = `translateX(${curIdx * 100}%)`;
    setIdx(curIdx);
  }

  return (
    <Content idx={idx}>
      <form className="wrap">
        <NavLink
          to="/"
          className="link"
          onClick={() => {
            moveNavi(0);
          }}>
          <div>
            <FontAwesomeIcon className="home icon" icon={faHouseUser} />
            <div className="tooltip">
              <span className="tooltiptext">Home</span>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/story"
          className="link"
          onClick={() => {
            moveNavi(1);
          }}>
          <div>
            <FontAwesomeIcon className="story icon" icon={faAddressBook} />
            <div className="tooltip">
              <span className="tooltiptext">story</span>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/daily"
          className="link"
          onClick={() => {
            moveNavi(2);
          }}>
          <div>
            <FontAwesomeIcon className="diary icon" icon={faBook} />
            <div className="tooltip">
              <span className="tooltiptext">diary</span>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/album"
          className="link"
          onClick={() => {
            moveNavi(3);
          }}>
          <div>
            <FontAwesomeIcon className="album icon" icon={faImage} />
            <div className="tooltip">
              <span className="tooltiptext">album</span>
            </div>
          </div>
        </NavLink>
        {isLogin ? (
          <NavLink
            to="/mypage"
            className="link"
            onClick={() => {
              moveNavi(4);
            }}>
            <div className="link">
              <FontAwesomeIcon className="mypage icon" icon={faUser} />
              <div className="tooltip">
                <span className="tooltiptext">mypage</span>
              </div>
            </div>
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className="link"
            onClick={() => {
              moveNavi(4);
            }}>
            <div>
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
