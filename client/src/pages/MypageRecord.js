import React from "react";
import Chart from "../components/Chart";
import PlantsCycleChange from "../components/PlantCycleChange";
import CalendarComponents from "../components/CalendarComponents";
import styled from "styled-components";

const Content = styled.div`
  display: grid;
`;

const MypageRecordRayOut = styled.div`
  background-color: ${(props) => props.theme.formColor};
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
      <MypageRecordRayOut>
        <CalendarComponents></CalendarComponents>
        <PlantsCycleChange></PlantsCycleChange>
        <Chart></Chart>
      </MypageRecordRayOut>
    </Content>
  );
};

export default MypageRecord;
