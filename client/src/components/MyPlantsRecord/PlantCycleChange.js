import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { makeCycleModal } from "../../utils/errExeption";
import useStore from "../../store/plantCycleStore";
import ChartComponent from "./ChartComponent";

const PlantsCycleChangeLayout = styled.div`
  > .space {
    height: 2vh;
  }
`;
const DayChecking = styled.div`
  display: grid;
  height: auto;
  width: calc(100 / 3);
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
  height: 100%;
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
`;

const CircleName = styled.div`
  grid-area: CircleName;
  display: grid;
  grid-template-columns: repeat(3, minmax(1fr, auto));
  grid-template-areas:
    "DayChecking DayChecking DayChecking"
    "waterName nutritionName soilName";
  align-items: center;
  margin: auto;
  width: 100%;
  .DayChecking {
    grid-area: DayChecking;
    display: flex;
    height: auto;
    .Date {
      width: 33%;
      margin: auto;
    }
  }

  > div {
    text-align: center;
  }
  > .waterName {
    grid-area: waterName;
    font-size: 1.2rem;
    color: #2070c4;
  }
  > .nutritionName {
    grid-area: nutritionName;
    font-size: 1.2rem;
    color: #f3a62b;
  }
  > .soilName {
    grid-area: soilName;
    font-size: 1.2rem;
    color: #714b33;
  }
`;

const PlantsCycleChange = ({ theLastDateOfAction }) => {
  const { plantCycle, popUpPlantCycleChangeModal, defaultWater, defaultFertilize, defaultRepot } = useStore();

  const upSetting = () => {
    popUpPlantCycleChangeModal();
  };

  const WaterData = [{ value: theLastDateOfAction.water }, { value: defaultWater - theLastDateOfAction.water }];
  const FertilizeData = [{ value: theLastDateOfAction.fertilize / 3 }, { value: (defaultFertilize - theLastDateOfAction.fertilize) / 3 }];
  const RepotData = [{ value: theLastDateOfAction.repot / 6 }, { value: (defaultRepot - theLastDateOfAction.repot) / 6 }];

  return (
    <PlantsCycleChangeLayout>
      {makeCycleModal(plantCycle)}
      <div className="space"></div>
      <div className="space"></div>
      <PlantsCycleChangeContainer>
        <DayDiv>D-Day</DayDiv>
        <CustomFontAwesomeIcon>
          <FontAwesomeIcon className="fa-solid fa-2x" icon={faGear} cursor="pointer" onClick={upSetting} />
        </CustomFontAwesomeIcon>
        <DayCircle>
          <ChartComponent WaterData={WaterData} FertilizeData={FertilizeData} RepotData={RepotData}></ChartComponent>
        </DayCircle>
        <CircleName>
          <div className="DayChecking">
            {defaultWater - theLastDateOfAction.water > 0 ? <div className="Date">D-{defaultWater - theLastDateOfAction.water}</div> : <div className="Date">물 마시고싶어요</div>}
            {defaultFertilize - theLastDateOfAction.fertilize > 0 ? <div className="Date">D-{defaultFertilize - theLastDateOfAction.fertilize}</div> : <div className="Date">밥 먹고싶어요</div>}
            {defaultRepot - theLastDateOfAction.repot > 0 ? <div className="Date">D-{defaultRepot - theLastDateOfAction.repot}</div> : <div className="Date">흙 주세요</div>}
          </div>
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
