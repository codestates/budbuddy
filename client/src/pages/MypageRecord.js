import React, { useEffect } from "react";
import Chart from "../components/MyPlantsRecord/Chart";
import PlantsCycleChange from "../components/MyPlantsRecord/PlantCycleChange";
import CalendarComponents from "../components/MyPlantsRecord/CalendarComponents";
import styled from "styled-components";
import useAjaxStore from "../store/ajaxStore";
import useStore from "../store/plantCycleStore";
import moment from "moment";
import { useLocation } from "react-router-dom";
const qs = require("query-string");

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
  const { search } = useLocation();
  const parsed = qs.parse(search);
  const currentUser = decodeURI(parsed.name); // 클릭하면 여기 바꾸게 해줘야함

  useEffect(() => {
    setListByPlantId();
  }, [setListByPlantId]);

  const FilterCurrentUser = listByPlantId.filter((el) => {
    return el.Plant.name === currentUser;
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
  const OnlyDate = FilterCurrentUser.reduce((acc, cur) => {
    acc.push(cur.date_pick);
    return acc;
  }, []);

  let SortedOnlyDate = OnlyDate.sort((a, b) => {
    return new Date(a) - new Date(b);
  });
  let ChartValue = SortedOnlyDate.reduce((acc, cur) => {
    FilterCurrentUser.map((el) => {
      if (el.date_pick === cur) {
        acc.push({
          day: moment(el.date_pick).diff(moment(SortedOnlyDate[0]), "days") + "일",
          value: el.plant_height,
        });
      }
      return el;
    });
    return acc;
  }, []);

  return (
    <Content>
      <MypageRecordRayOut>
        <CalendarComponents selectActions={selectActions} currentUser={currentUser}></CalendarComponents>
        <PlantsCycleChange theLastDateOfAction={theLastDateOfAction}></PlantsCycleChange>
        <Chart currentUser={currentUser} ChartValue={ChartValue}></Chart>
      </MypageRecordRayOut>
    </Content>
  );
};

export default MypageRecord;
