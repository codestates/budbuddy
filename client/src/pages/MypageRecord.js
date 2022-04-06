import React, { useState, useEffect } from "react";
import Chart from "../components/MyPlantsRecord/Chart";
import PlantsCycleChange from "../components/MyPlantsRecord/PlantCycleChange";
import CalendarComponents from "../components/MyPlantsRecord/CalendarComponents";
import styled from "styled-components";
import useAjaxStore from "../store/ajaxStore";
import useStore from "../store/plantCycleStore";
import moment from "moment";

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
  const { setListByPlantId, listByPlantId } = useAjaxStore();
  const { defaultWater, defaultFertilize, defaultRepot } = useStore();

  const [currentUser, setCurrentUser] = useState("안녕"); // 클릭하면 여기 바꾸게 해줘야함
  useEffect(() => {
    setListByPlantId();
  }, []);

  const FilterCurrentUser = listByPlantId.filter((el) => {
    if (el.Plant.name === currentUser) {
      return true;
    }
  });

  const selectActions = FilterCurrentUser.reduce((acc, cur) => {
    const Actions = [];
    for (let i = 0; i < cur.Journal_Actions.length; i++) {
      Actions.push(cur.Journal_Actions[i].Action.type);
    }
    let Values = { date_pick: cur.date_pick, actions: Actions };
    acc.push(Values);
    return acc;
  }, []);

  const theLastDateOfAction = selectActions.reduce(
    (acc, cur) => {
      const pastDays = moment().diff(moment(cur.date_pick), "days");
      if (cur.actions.includes("water")) {
        if (acc.water > pastDays) {
          acc.water = pastDays;
        }
      }
      if (cur.actions.includes("fertilize")) {
        if (acc.fertilize > pastDays) {
          acc.fertilize = pastDays;
        }
      }
      if (cur.actions.includes("repot")) {
        if (acc.repot > pastDays) {
          acc.repot = pastDays;
        }
      }
      return acc;
    },
    { repot: defaultRepot, fertilize: defaultFertilize, water: defaultWater },
  );
  console.log("theLastDateOfAction", theLastDateOfAction);

  return (
    <Content>
      <MypageRecordRayOut>
        <CalendarComponents selectActions={selectActions}></CalendarComponents>
        <PlantsCycleChange theLastDateOfAction={theLastDateOfAction}></PlantsCycleChange>
        <Chart></Chart>
      </MypageRecordRayOut>
    </Content>
  );
};

export default MypageRecord;
