import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideBarStore from "../../store/SideBarStore";

export const Content = styled.nav`
  position: fixed;
  top: 0;
  /* width: 100% */

  justify-content: space-evenly;
  padding: 1rem;

  width: 100vw;

  /* a {
    color: black;
    transition: color 0.25s cubic-bezier(0, 1.23, 1, 0.55);
  }
  a:hover {
    color: white;
  } */
  /* a:active {
    color: black;
  } */
  @media screen and (min-width: 391px) {
    width: ${(props) => props.theme.webWidth};
  }
`;
const Placed = styled.div`
  text-align: right;
`;

function MenuBar() {
  const { popUpSideBarStore } = SideBarStore();
  const Open = () => {
    popUpSideBarStore();
  };
  return (
    <Content>
      <Placed>
        <FontAwesomeIcon className="fa-solid fa-2x" icon={faBars} cursor="pointer" onClick={Open} />
      </Placed>
    </Content>
  );
}

export default MenuBar;
