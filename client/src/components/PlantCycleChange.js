import React from "react";
import styled from "styled-components";

const PlantsCycleChangeContainer = styled.div`
  background-color: ${(props) => props.theme.formColor};
  grid-area: PlantsCycleChange;
  display: grid;
  grid-template-columns: repeat(3, minmax(1fr, auto));
  grid-template-rows: minmax(3fr, auto);
  grid-template-areas:
    "DayDiv . ."
    "DayCircle DayCircle DayCircle"
    "CircleName CircleName CircleName";
  border: 1px solid black;
  width: 92.5%;
  height: 100%;
  margin: auto;
`;
const DayDiv = styled.h2`
  grid-area: DayDiv;
  text-align: left;
  margin: auto;
`;
const DayCircle = styled.div`
  grid-area: DayCircle;
  display: grid;
  grid-template-columns: repeat(3, minmax(1fr, auto));
  grid-template-areas: "water nutrition soil";
  margin: auto;
  width: 100%;
`;
const CircleDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  padding-bottom: 42%;
  > .water {
    grid-area: water;
    width: 100%;
    height: 400%;
    border-radius: 50%;
    background-color: skyblue;
    border: 2px solid;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > .nutrition {
    grid-area: nutrition;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: yellow;
    border: 2px solid;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > .soil {
    grid-area: soil;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: brown;
    border: 2px solid;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CircleName = styled.div`
  grid-area: CircleName;
  display: flex;
  align-items: center;
  margin: auto;
  > div {
    /* width: 7vw;
    height: 2vw; */
    /* width: 30vw;
    height: 5vw; */
    border-radius: 50%;
    align-items: center;
    text-align: center;
    /* line-height: 5vw; */
    /* line-height: 2vw; */
  }
`;
const PlantsCycleChange = () => {
  return (
    <PlantsCycleChangeContainer>
      <DayDiv>D-Day</DayDiv>
      <DayCircle>
        <CircleDiv>
          <div className="water">D-9</div>
        </CircleDiv>
        <CircleDiv>
          <div className="nutrition">D-9</div>
        </CircleDiv>
        <CircleDiv>
          <div className="soil">D-9</div>
        </CircleDiv>
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
