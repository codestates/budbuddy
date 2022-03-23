import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import styled from "styled-components";
import moment from "moment";

const CalendarContainer = styled.div`
  grid-area: CalendarContainer;
  align-items: center;
  margin: auto;
`;
const Water = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
`;

function CalendarComponents() {
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState(["2020 - 03 - 22"]);
  console.log(mark);

  return (
    <CalendarContainer>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        navigationLabel={null}
        // showNeighboringMonth={false}// 전달 이번달 날짜 회색으로 보여주기
        locale="ko-KO"
        className="mx-auto w-full text-sm border-b"
        tileContent={({ date, view }) => {
          if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return "x";
          }
        }}
        // tileContent={({ activeStartDate, date, view }) => {
        //   if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
        //     return (
        //       <>
        //         <div className="flex justify-center items-center absoluteDiv">
        //           <Water></Water>
        //         </div>
        //       </>
        //     );
        //   }
        // }}
      />
      <Water></Water>
    </CalendarContainer>
  );
}
export default CalendarComponents;
