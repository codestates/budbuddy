import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  margin: 0;

  .popup {
    display: flex;
    position: fixed;
    width: 100vw;
    height: 70vh;
    background: snow;
    animation: jelly 0.6s ease;
    z-index: 2;
    top: 8rem;
    /* display: none; */
    border-radius: ${(props) => props.theme.borderRadius};
    @media screen and (min-width: 391px) {
      width: ${(props) => props.theme.webWidth * 0.9 + "px"};
    }
  }

  @keyframes jelly {
    from {
      transform: scale(1, 1);
    }
    30% {
      transform: scale(1.25, 0.75);
    }
    40% {
      transform: scale(0.75, 1.25);
    }
    50% {
      transform: scale(1.15, 0.85);
    }
    65% {
      transform: scale(0.95, 1.05);
    }
    75% {
      transform: scale(1.05, 0.95);
    }
    to {
      transform: scale(1, 1);
    }
  }
`;
const BlackScreen = styled.div`
  /* border: solid 1px blue; */
  position: fixed;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  animation: darken 0.2s ease;
  z-index: 1;
  top: 0;

  @keyframes darken {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.35);
    }
  }

  @media screen and (min-width: 391px) {
    width: ${(props) => props.theme.webWidth + "px"};
  }
`;

const JellyPopup = ({ setJellyPopup }) => {
  function close() {
    console.log("젤리팝업 닫기");
    setJellyPopup(false);
  }

  return (
    <Layout>
      <BlackScreen className="black" onClick={close} />
      <div className="popup"></div>
    </Layout>
  );
};

export default JellyPopup;
