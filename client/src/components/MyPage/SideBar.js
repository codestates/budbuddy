import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import SideBarFuntions from "./SideBarFunctions";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  /* overflow: hidden; */
  #menu-icon {
    display: none;
  }

  .menu-wrap {
    display: ${(props) => (props.isSidebar ? "none" : "flex")};
    justify-content: flex-end;
    margin: 1rem 1rem 0 0;

    .hamburger-icon {
      font-size: 1.8rem;
      color: SlateGrey;
    }
  }
`;

const SideBarWrapper = styled.div`
  /* border: solid 1px black; */
  position: absolute;
  width: 50%;
  min-height: 100vh;
  left: ${(props) => (props.isSidebar ? "50%" : "100%")};
  transition: all 0.5s ease;
  z-index: 1;
  background-color: ${(props) => props.theme.SideBarBgColor};
  .sidebar {
    display: flex;
    flex-direction: column;
  }
  .xmark {
    align-self: end;
    font-size: 2rem;
    margin: 1rem 0.9rem 0 0;
    padding: 0 0.3rem;
    border-radius: ${(props) => props.theme.borderRadius};
    transition: background-color 0.2s ease;
  }

  .xmark:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
  .area_desc {
    margin: 1rem 0;
    /* border: solid 1px red; */
  }
`;

const BlackScreen = styled.div`
  /* border: solid 1px blue; */
  position: absolute;
  width: 100%;
  min-height: ${(props) => (props.isSidebar ? "100vh" : "auto")};
  background-color: ${(props) => (props.isSidebar ? "rgba(0, 0, 0, 0.35)" : "rgba(0, 0, 0, 0.0)")};
  transition: all 0.8s ease;
  visibility: ${(props) => (props.isSidebar ? "visible" : "hidden")};
`;

const SideBar = () => {
  const menuRef = useRef(null);
  const [isSidebar, setSideBar] = useState(false);
  function SidebarToggle() {
    menuRef.current.checked = !menuRef.current.checked;
    setSideBar(menuRef.current.checked);
  }

  return (
    <Layout isSidebar={isSidebar}>
      <div className="menu-wrap">
        <input ref={menuRef} type="checkbox" id="menu-icon" />
        <label forhtml="menu-icon">
          <FontAwesomeIcon className="hamburger-icon" icon={faBars} cursor="pointer" onClick={SidebarToggle} />
        </label>
      </div>
      <SideBarWrapper isSidebar={isSidebar}>
        <div className="sidebar">
          <FontAwesomeIcon className="xmark" icon={faXmark} onClick={SidebarToggle} />
          <span className="area_desc">SIDEBAR</span>
          <SideBarFuntions />
        </div>
      </SideBarWrapper>
      <BlackScreen isSidebar={isSidebar} />
    </Layout>
  );
};

export default SideBar;
