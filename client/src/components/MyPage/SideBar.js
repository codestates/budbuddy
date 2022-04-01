import React, { useState } from "react";
import styled from "styled-components";
import SideBarStore from "../../store/SideBarStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { budDummy } from "../../utils/dummy";
import SideBarFunctions from "./SideBarFunctions";
import useLoginStore from "../../store/LoginStore";
import { makeModal } from "../../utils/errExeption";

const SideBarContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  /* align-self: flex-end; */
  overflow: hidden;
  position: fixed;
  z-index: ${({ isSideBarState }) => (isSideBarState ? 10 : 0)};
  @media screen and (min-width: 391px) {
    width: ${(props) => props.theme.webWidth};
  }
`;
const SideBarMain = styled.div`
  width: 45%;
  min-height: 100vh;
  background-color: #b5cda2;
  align-self: flex-end;
  position: absolute;
  top: 0;
  right: -100%;
  transition: 500ms;
  z-index: ${({ isSideBarState }) => (isSideBarState ? 10 : 0)};
  right: ${({ isSideBarState }) => (isSideBarState ? "0%" : "-100%")};

  .id {
    height: 13vh;
    display: grid;
    grid-template-columns: repeat(2, minmax(1fr, auto));
    grid-template-rows: repeat(3, minmax(1fr, auto));
    grid-template-areas:
      " . NameAndDelete NameAndDelete "
      " image name name ";
    > .image {
      text-align: center;
      margin: 5px;
      grid-area: image;
      height: 50px;
      width: 50px;
      border-radius: 50px;
    }
    > .NameAndDelete {
      flex-direction: column;
      text-align: right;
      grid-area: NameAndDelete;
      .deleteDiv {
        background-color: transparent;
        cursor: pointer;
        border: none;
        margin: 15px;
      }
    }
    .name {
      text-align: left;
      font-size: 1rem;
      margin: 22px 0px 0px 0px;
      grid-area: name;
      color: ${(props) => props.theme.calendarBottomColor};
    }
  }
  .space {
    height: 5vh;
  }
`;

function SideBar() {
  const { isSideBarState, DownSideBarStore } = SideBarStore();
  const { nickname } = useLoginStore();
  const Close = () => {
    DownSideBarStore();
  };
  const [modalCode, setModalCode] = useState("");

  return (
    <SideBarContainer isSideBarState={isSideBarState}>
      <SideBarMain isSideBarState={isSideBarState}>
        {makeModal(modalCode)}
        <div className="id">
          <img className="image" src={budDummy[0].src} alt="" />
          <div className="NameAndDelete">
            <button className="deleteDiv" onClick={Close}>
              <FontAwesomeIcon className="fa-solid fa-3x" icon={faX} color="white" />
            </button>
          </div>
          <div className="name">ID:{nickname}</div>
        </div>
        <div className="space"></div>
        <SideBarFunctions setModalCode={setModalCode} />
      </SideBarMain>
    </SideBarContainer>
  );
}

export default SideBar;
