import React from "react";
import Chart from "../components/Chart";
import PlantsCycleChange from "../components/PlantCycleChange";
import CalendarComponents from "../components/Calendar";
import styled from "styled-components";

// const CalendarDiv = styled.div`

// `;

const Content = styled.div`
  background-color: ${(props) => props.theme.formColor};
  display: grid;
  grid-template-columns: repeat(3, minmax(1fr, auto));
  grid-template-rows: repeat(5, minmax(1fr, auto));
  grid-template-areas:
    " . CalendarContainer . "
    " . . . "
    " . PlantsCycleChange . "
    " . . . "
    " . ChartSvg . ";
`;

const MypageRecord = () => {
  return (
    <Content>
      <CalendarComponents></CalendarComponents>
      <PlantsCycleChange></PlantsCycleChange>
      <Chart></Chart>
    </Content>
  );
};

export default MypageRecord;
