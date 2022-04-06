import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faThermometer, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { CycleDay, CycleMonth } from "../../utils/dummy";
import { makeModal } from "../../utils/errExeption";
import useStore from "../../store/plantCycleStore";

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
const SelectPlace = styled.div`
  display: grid;
  text-align: center;
  padding: 20px;
`;
const FontAwesomePlace = styled.div`
  margin: auto;
`;

function PlantsCycleChangeModal() {
  const [isModal, setIsModal] = useState("");
  const [water, setWater] = useState("10일");
  const [fertilize, setFertilize] = useState("3개월");
  const [repot, setRepot] = useState("6개월");

  const { setDefaultWater, setDefaultFertilize, setDefaultRepot, closePlantCycleChangeModal } = useStore();

  function removeModal() {
    setIsModal("hidden");
    closePlantCycleChangeModal();
  }

  const [accessModal, setaccessModal] = useState(0);
  const accessButton = () => {
    setDefaultWater(water.slice(0, water.length - 1));
    setDefaultFertilize(fertilize.slice(0, fertilize.length - 2) * 30);
    setDefaultRepot(repot.slice(0, repot.length - 2) * 30);
    setaccessModal("plantCycleReplaced");
  };

  const WaterChangeFunction = (e) => {
    setWater(e.target.value);
  };
  const FertilizeChangeFunction = (e) => {
    setFertilize(e.target.value);
  };
  const RepotChangeFunction = (e) => {
    setRepot(e.target.value);
  };

  return (
    <ModalContainer className={`modal ${isModal}`}>
      {makeModal(accessModal)}
      <div className={`modal_overlay ${isModal}`} />
      <div className={`modal_content ${isModal}`}>
        <div className={`modal_text ${isModal}`}>설정 주기를 설정해주세요</div>
        <SelectDiv>
          <SelectPlace>
            <FontAwesomePlace>
              <FontAwesomeIcon className="fa-solid fa-2x" icon={faDroplet} color="skyblue" />
            </FontAwesomePlace>
            <div className="modal_select">
              <select value={water} onChange={(e) => WaterChangeFunction(e)}>
                {CycleDay.map((el) => {
                  return (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>
          </SelectPlace>
          <SelectPlace>
            <FontAwesomePlace>
              <FontAwesomeIcon className="fa-solid fa-2x" icon={faThermometer} color="#D7DF01" />
            </FontAwesomePlace>
            <div className="modal_select">
              <select value={fertilize} onChange={(e) => FertilizeChangeFunction(e)}>
                {CycleMonth.map((el) => {
                  return (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>
          </SelectPlace>
          <SelectPlace>
            <FontAwesomePlace>
              <FontAwesomeIcon className="fa-solid fa-2x" icon={faRepeat} color="brown" />
            </FontAwesomePlace>
            <div className="modal_select">
              <select value={repot} onChange={(e) => RepotChangeFunction(e)}>
                {CycleMonth.map((el) => {
                  return (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>
          </SelectPlace>
        </SelectDiv>
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
              removeModal();
            }}>
            X
          </button>
        </SelectDiv>
      </div>
    </ModalContainer>
  );
}

export default PlantsCycleChangeModal;
