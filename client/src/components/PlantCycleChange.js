import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { makeCycleModal } from "../utils/errExeption";

const PlantsCycleChangeLayout = styled.div`
  > .space {
    height: 2vh;
  }
`;

const PlantsCycleChangeContainer = styled.div`
  background-color: ${(props) => props.theme.formColor};
  grid-area: PlantsCycleChange;
  display: grid;
  grid-template-columns: repeat(3, minmax(1fr, auto));
  grid-template-rows: minmax(3fr, auto);
  grid-template-areas:
    "DayDiv . gear"
    "DayCircle DayCircle DayCircle"
    "CircleName CircleName CircleName";
  border: 1px solid black;
  width: 95%;
  height: 17vh;
  margin: auto;
  border-radius: 10px;
`;
const DayDiv = styled.h2`
  grid-area: DayDiv;
  text-align: left;
  margin: auto;
`;
const CustomFontAwesomeIcon = styled.div`
  grid-area: gear;
  text-align: right;
  margin: 5px;
`;
const DayCircle = styled.div`
  grid-area: DayCircle;
  display: grid;
  grid-template-columns: repeat(3, minmax(1fr, auto));
  grid-template-areas: "water nutrition soil";
  margin: auto;
  width: 100%;
  height: 10vh;
  border-top: 1px solid black;
  > .water {
    grid-area: water;
    background-color: skyblue;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    border: 2px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
  > .nutrition {
    grid-area: nutrition;
    background-color: yellow;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    border: 2px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
  > .soil {
    grid-area: soil;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background-color: brown;
    border: 2px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
`;

const CircleName = styled.div`
  grid-area: CircleName;
  display: grid;
  grid-template-columns: repeat(3, minmax(1fr, auto));
  grid-template-areas: "waterName nutritionName soilName";
  align-items: center;
  margin: auto;
  width: 100%;
  > div {
    text-align: center;
  }
  > .waterName {
    grid-area: waterName;
  }
  > .nutritionName {
    grid-area: nutritionName;
  }
  > .soilName {
    grid-area: soilName;
  }
`;
const PlantsCycleChange = () => {
  const [modalCode, setModalCode] = useState(0);
  const upSetting = () => {
    setModalCode("makePlantCycleChangeModal");
  };

  return (
    <PlantsCycleChangeLayout>
      {makeCycleModal(modalCode)}
      <div className="space"></div>
      <div className="space"></div>
      <PlantsCycleChangeContainer>
        <DayDiv>D-Day</DayDiv>
        <CustomFontAwesomeIcon>
          <FontAwesomeIcon className="fa-solid fa-2x" icon={faGear} cursor="pointer" onClick={upSetting} />
        </CustomFontAwesomeIcon>
        <DayCircle>
          <div className="water">D-9</div>
          <div className="nutrition">D-9</div>
          <div className="soil">D-9</div>
        </DayCircle>
        <CircleName>
          <div className="waterName">물주기</div>
          <div className="nutritionName">영양제</div>
          <div className="soilName">분갈이</div>
        </CircleName>
      </PlantsCycleChangeContainer>
      <div className="space"></div>
    </PlantsCycleChangeLayout>
  );
};

export default PlantsCycleChange;
