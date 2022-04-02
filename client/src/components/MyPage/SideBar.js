import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import SideBarFuntions from "./SideBarFunctions";
import useLoginStore from "../../store/LoginStore";

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
    display: flex;
    /* border: solid 1px red; */
    .file {
    }
    .profile-wrap > .profileImg {
      object-fit: cover;
      width: 50px;
      height: 50px;
      margin: 0.3rem;
      border-radius: 50%;
      border: 2px solid ForestGreen;
      box-shadow: inset 0px 0px 2px 3px ForestGreen;
      transition: border 0.15s ease, box-shadow 0.15s ease;
    }
    .profileImg {
      border: 2px solid Gray;
      width: 50px;
      height: 50px;
      margin: 0.3rem;
      border-radius: 50%;
      box-shadow: inset 0px 0px 2px 3px Gray;
      transition: border 0.15s ease, box-shadow 0.15s ease;
    }
    .profileImg.empty {
      border: 2px solid Gray;
      width: 50px;
      height: 50px;
      margin: 0.3rem;
      border-radius: 50%;
      box-shadow: inset 0px 0px 2px 3px Gray;
      transition: border 0.15s ease, box-shadow 0.15s ease;
    }
    .profile-wrap > .profileImg:hover {
      border: 2px solid DodgerBlue;
      box-shadow: inset 0px 0px 2px 3px DodgerBlue;
    }
    .profileImg:hover {
      border: 2px solid Tomato;
      box-shadow: inset 0px 0px 2px 3px Tomato;
      transition: border 0.15s ease, box-shadow 0.15s ease;
    }
    .profileImg.empty:hover {
      border: 2px solid Tomato;
      box-shadow: inset 0px 0px 2px 3px Tomato;
      transition: border 0.15s ease, box-shadow 0.15s ease;
    }

    .profile-wrap {
      grid-area: profile-wrap;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .profile-name {
      line-height: 4rem;
      color: ${(props) => props.theme.calendarBottomColor};
    }
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
  const { isLogin, nickname, userNumber, image, setImage } = useLoginStore();
  const [isSidebar, setSideBar] = useState(false);
  const [userProfile, setUserProfile] = useState(image);
  function SidebarToggle() {
    menuRef.current.checked = !menuRef.current.checked;
    setSideBar(menuRef.current.checked);
  }
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      console.log("result@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", result);
      setUserProfile(result);
    };
    reader.readAsDataURL(theFile);
    // setImage(userProfile);
  };

  useEffect(() => {
    setImage(userProfile);
  }, [userProfile]);

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
          <span className="area_desc">
            <div className="profile-wrap">
              <label className="file" htmlFor="input-file">
                <img title="프로필이미지 변경하기" className={`${"profileImg"} ${!userProfile ? "empty" : ""}`} src={userProfile || "Dummy/empty_user.png"} alt="" />
              </label>
              <input id="input-file" type="file" accept="image/*" onChange={onFileChange} style={{ display: "none" }} name="upload_img" />
            </div>
            <div className="profile-name">ID: {nickname}</div>
          </span>
          <SideBarFuntions />
        </div>
      </SideBarWrapper>
      <BlackScreen isSidebar={isSidebar} />
    </Layout>
  );
};

export default SideBar;
