import React, { useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  > .modal_overlay {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    width: 100%;
    position: absolute;
  }

  > .modal_content {
    background-color: white;
    padding: 10px 10px;
    justify-content: center;
    text-align: center;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    width: 40%;
    height: 15%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  > .modal_content > .modal_text {
    margin: 0;
    font-size: 20px;

    display: grid;
    justify-content: center;
    align-items: center;

    white-space: pre;
  }

  > .modal_content > button {
    all: unset;
    background-color: steelblue;
    color: white;
    padding: 5px 20px;
    border-radius: 10%;
    cursor: pointer;

    margin: 10px;
    width: 3%;
    height: 20%;
    transform: translateY(10px);
  }

  &.hidden {
    display: none;
  }
`;

function ShadowModal({ text }) {
  const [isModal, setIsModal] = useState("");

  function removeModal() {
    setIsModal("hidden");
  }

  return (
    <ModalContainer
      className={`modal ${isModal}`}
      onClick={() => {
        removeModal();
      }}
    >
      <div className={`modal_overlay ${isModal}`} />
      <div className={`modal_content ${isModal}`}>
        <div className={`modal_text ${isModal}`}>{text}</div>
        <button className={`${isModal}`}>X</button>
      </div>
    </ModalContainer>
  );
}

export default ShadowModal;
