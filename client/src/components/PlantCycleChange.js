import React from "react";
import styled from "styled-components";

const PlantsCycleChangeContainer = styled.div`
  background-color: ${(props) => props.theme.mainColor};
  grid-area: PlantsCycleChange;
  display: grid;
  grid-template-columns: repeat(3, minmax(1fr, auto));
  grid-template-rows: minmax(3fr, auto);
  grid-template-areas:
    "DayDiv . ."
    "DayCircle DayCircle DayCircle"
    "CircleName CircleName CircleName";
`;
const DayDiv = styled.h2`
  grid-area: DayDiv;
  text-align: left;
  margin: auto;
`;
const DayCircle = styled.div`
  grid-area: DayCircle;
  display: flex;
  align-items: center;
  margin: auto;
  > div {
    width: 30vw;
    height: 30vw;
    border-radius: 50%;
    align-items: center;
    text-align: center;
    line-height: 30vw;
  }
  > .water {
    background-color: skyblue;
  }
  > .nutrition {
    background-color: yellow;
  }
  > .soil {
    background-color: brown;
  }
`;
const CircleName = styled.div`
  grid-area: CircleName;
  display: flex;
  align-items: center;
  margin: auto;
  > div {
    width: 30vw;
    height: 5vw;
    border-radius: 50%;
    align-items: center;
    text-align: center;
    line-height: 5vw;
  }
`;
const PlantsCycleChange = () => {
  return (
    <PlantsCycleChangeContainer>
      <DayDiv>D-Day</DayDiv>
      <DayCircle>
        <div className="water">D-9</div>
        <div className="nutrition">D-50</div>
        <div className="soil">D-40</div>
      </DayCircle>
      <CircleName>
        <div>물</div>
        <div>영양제</div>
        <div>분갈이</div>
      </CircleName>
    </PlantsCycleChangeContainer>
  );
};

export default PlantsCycleChange;
