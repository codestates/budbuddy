import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  #menu-icon {
    display: none;
  }

  .menu-wrap {
    display: ${(props) => (props.isSidebar ? "none" : "flex")};
    justify-content: flex-end;
    margin: 1rem 1rem 0 0;
    z-index: 1;

    .hamburger-icon {
      font-size: 1.8rem;
      color: SlateGrey;
    }
  }
`;

const SideBar = styled.div`
  border: solid 1px black;
  position: absolute;
  width: 50%;
  height: 100%;
  left: ${(props) => (props.isSidebar ? "50%" : "100%")};
  transition: all 0.5s ease;
  z-index: 2;

  .sidebar {
    display: flex;
    flex-direction: column;
  }
  .xmark {
    align-self: end;
    font-size: 1.9rem;
    margin: 0.5rem 0.7rem 0 0;
    padding: 0 0.3rem;
    border: solid 2px black;
  }
  .area_desc {
    border: solid 1px red;
  }
`;

const BlackScreen = styled.div`
  border: solid 1px blue;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isSidebar ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.0)")};
  transition: all 0.5s ease;
  z-index: 0;
`;

const Test2 = () => {
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
      <SideBar isSidebar={isSidebar}>
        <div className="sidebar">
          <FontAwesomeIcon className="xmark" icon={faXmark} onClick={SidebarToggle} />
          <span className="area_desc">SIDEBAR</span>
        </div>
      </SideBar>
      <BlackScreen isSidebar={isSidebar} />
    </Layout>
  );
};

export default Test2;
