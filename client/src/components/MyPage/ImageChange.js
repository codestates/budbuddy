import React, { useState } from "react";
import styled from "styled-components";
import { makeModal } from "../../utils/errExeption";
import useStore from "../../store/plantCycleStore";
import ImageChangeStore from "../../store/ImageChangeStore";

const ModalContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  place-items: center;
  z-index: 10;

  > .modal_overlay {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    width: 100%;
    position: absolute;
  }

  > .modal_content {
    position: relative;
    background-color: white;
    padding: 30px;
    border-radius: ${(props) => props.theme.borderRadius};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

    display: grid;
    align-items: center;
    justify-content: center;
    place-items: center;
    text-align: center;

    flex-direction: column;
  }

  > .modal_content > .modal_text {
    display: grid;
    white-space: pre;
    font-size: 1.2rem;
  }

  &.hidden {
    display: none;
  }
`;

const SelectDiv = styled.div`
  display: flex;

  > button {
    all: unset;
    background-color: steelblue;
    color: white;
    padding: 6px 10px;
    border-radius: ${(props) => props.theme.borderRadius};
    cursor: pointer;
    margin: 2vw;

    transform: translateY(10px);
  }
`;
const PicturePlace = styled.img`
  width: 210px;
  height: 210px;
`;

function ImageChange() {
  const { closeImageChangeModal } = ImageChangeStore();
  const [isModal, setIsModal] = useState("");
  const { closePlantCycleChangeModal } = useStore();

  function removeModal() {
    setIsModal("hidden");
    closePlantCycleChangeModal();
  }

  const [accessModal, setaccessModal] = useState(0);
  const accessButton = () => {
    setaccessModal("plantCycleReplaced");
  };
  const [img, setImg] = useState(null);

  function onFileChange(e) {
    const {
      target: { files },
    } = e;

    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImg(result);
    };

    reader.readAsDataURL(theFile);
  }

  return (
    <ModalContainer className={`modal ${isModal}`}>
      {makeModal(accessModal)}
      <div className={`modal_overlay ${isModal}`} />
      <div className={`modal_content ${isModal}`}>
        <div className={`modal_text ${isModal}`}>이미지를 선택해주세요</div>
        <PicturePlace src={img}></PicturePlace>
        <form method="post" encType="multipart/form-data">
          <div className="button">
            <label htmlFor="chooseFile">👉 CLICK HERE! 👈</label>
          </div>
          <input className="hidden" type="file" id="chooseFile" name="chooseFile" accept="image/*" onChange={onFileChange} style={{ display: "none" }} />
        </form>
        <SelectDiv>
          <button
            className={`${isModal}`}
            onClick={() => {
              accessButton();
            }}>
            V
          </button>
          <button
            className={`${isModal}`}
            onClick={() => {
              closeImageChangeModal();
              removeModal();
            }}>
            X
          </button>
        </SelectDiv>
      </div>
    </ModalContainer>
  );
}

export default ImageChange;
