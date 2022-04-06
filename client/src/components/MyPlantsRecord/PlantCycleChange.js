import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { makeCycleModal } from "../../utils/errExeption";
import useStore from "../../store/PlantCycleStore";
import ChartComponent from "./ChartComponent";
import useAjaxStore from "../../store/AjaxStore";

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
  grid-template-areas: "waterName nutritionName soilName";
  align-items: center;
  margin: auto;
  width: 100%;
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

const PlantsCycleChange = () => {
  const { plantCycle, popUpPlantCycleChangeModal } = useStore();
  const { setListByPlantId, listByPlantId } = useAjaxStore();

  useEffect(() => {
    setListByPlantId();
  }, []);
  console.log(listByPlantId);

  const upSetting = () => {
    popUpPlantCycleChangeModal();
  };

  const [defaultWater, setDefaultWater] = useState("10");
  const [defaultFertilize, setDefaultFertilize] = useState("90");
  const [defaultRepot, setDefaultRepot] = useState("180");

  const data = [{ value: 30 }, { value: 50 }];

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
          <ChartComponent data={data}></ChartComponent>
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
