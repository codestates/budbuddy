import React, { useState } from "react";
import styled from "styled-components";
import SideBarStore from "../../store/SideBarStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { budDummy } from "../../utils/dummy";
import SideBarFunctions from "./SideBarFunctions";
import { makeModal } from "../../utils/errExeption";

const SideBarContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  /* align-self: flex-end; */
  position: fixed;
  z-index: 5;
  @media screen and (min-width: 391px) {
    width: ${(props) => props.theme.webWidth};
  }
`;
const SideBarMain = styled.div`
  width: 45%;
  min-height: 100vh;
  background-color: #b5cda2;
  align-self: flex-end;
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
  const { DownSideBarStore } = SideBarStore();
  const Close = () => {
    DownSideBarStore();
  };
  const [modalCode, setModalCode] = useState("");

  return (
    <SideBarContainer>
      <SideBarMain>
        {makeModal(modalCode)}
        <div className="id">
          <img className="image" src={budDummy[0].src}></img>
          <div className="NameAndDelete">
            <button className="deleteDiv" onClick={Close}>
              <FontAwesomeIcon className="fa-solid fa-3x" icon={faX} color="white" />
            </button>
          </div>
          <div className="name">ID:옆집할매토종닭죽</div>
        </div>
        <div className="space"></div>
        <SideBarFunctions setModalCode={setModalCode} />
      </SideBarMain>
    </SideBarContainer>
  );
}

export default SideBar;
