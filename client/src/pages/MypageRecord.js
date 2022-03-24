import React from "react";
import Chart from "../components/Chart";
import { Content } from "../styles/pages/MypageRecordStyled";
import PlantsCycleChange from "../components/PlantCycleChange";
import CalendarComponents from "../components/Calendar";

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
