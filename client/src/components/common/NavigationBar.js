import React from "react";
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

    a:nth-child(1):hover ~ .ani {
      border: solid 1px red;
      left: 0%;
    }

    a:nth-child(2):hover ~ .ani {
      border: solid 1px red;
      left: 20%;
    }

    a:nth-child(3):hover ~ .ani {
      border: solid 1px red;
      left: 40%;
    }

    a:nth-child(4):hover ~ .ani {
      border: solid 1px red;
      left: 60%;
    }

    a:nth-child(5):hover ~ .ani {
      border: solid 1px red;
      left: 80%;
    }

    .ani {
      flex-grow: 1;
      position: absolute;
      width: ${(props) => 100 / 5 + "%"};
      height: 100%;
      background: LightCoral;
      left: 0;
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
  return (
    <Content>
      <div className="wrap">
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
            <FontAwesomeIcon className="story icon" icon={faAddressBook} />
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
            <FontAwesomeIcon className="album icon" icon={faImage} />
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
              <FontAwesomeIcon className="login icon" icon={faDoorOpen} />
              <div className="tooltip">
                <span className="tooltiptext">Login</span>
              </div>
            </div>
          </NavLink>
        )}
        <div className="ani"></div>
      </div>
    </Content>
  );
}

export default NavigationBar;
