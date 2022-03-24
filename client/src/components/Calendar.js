import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import styled from "styled-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faThermometer, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { doing } from "../utils/dummy";
import CalendarTileDiv from "./CalendarTileDiv";

const CalendarContainer = styled.div`
  grid-area: CalendarContainer;
  align-items: center;
  width: 100vw;
  height: auto;
  margin: auto;
`;

function CalendarComponents() {
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState(doing);

  const tileContent = ({ date, view }) => {
    const find = mark.find((element) => element.day === moment(date).format("YYYY-MM-DD"));
    return find ? <CalendarTileDiv actions={find.actions} /> : <CalendarTileDiv />;
  };

  return (
    <CalendarContainer>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        navigationLabel={null}
        locale="ko-KO"
        tileContent={tileContent}
      />
    </CalendarContainer>
  );
}
export default CalendarComponents;
