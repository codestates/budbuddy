import React from "react";
import styled from "styled-components";
import useStore from "../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
  const { login } = useStore();

  return (
    <Content>
      <Placed>
        <FontAwesomeIcon className="fa-solid fa-2x" icon={faBars} cursor="pointer" />
      </Placed>
    </Content>
  );
}

export default MenuBar;
