import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import styled from "styled-components";
import moment from "moment";
import { doing } from "../utils/dummy";
import CalendarTileDiv from "./CalendarTileDiv";
import "./Calendar.css";

const CalendarContainer = styled.div`
  grid-area: CalendarContainer;
  margin: auto;
`;
const CalendarTitle = styled.h2`
  text-align: center;
`;

function CalendarComponents() {
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState(doing);

  const tileContent = ({ date, view }) => {
    const find = mark.find((element) => element.day === moment(date).format("YYYY-MM-DD"));
    return find ? <CalendarTileDiv actions={find.actions} /> : <CalendarTileDiv />;
  };
  // const tileClassName = ({ date, view }) => {
  //   if (mark.find((element) => element.day === moment(date).format("YYYY-MM-DD"))) {
  //     return "highlight";
  //   }
  //   return "normal";
  // }; //배경색

  return (
    <CalendarContainer>
      <CalendarTitle>스투키 관리 기록</CalendarTitle>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        navigationLabel={null}
        locale="ko-KO"
        tileContent={tileContent}
        // tileClassName={tileClassName}
      />
    </CalendarContainer>
  );
}
export default CalendarComponents;
