import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import styled from "styled-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faThermometer, faRepeat } from "@fortawesome/free-solid-svg-icons";

const CalendarContainer = styled.div`
  grid-area: CalendarContainer;
  align-items: center;
  width: 100vw;
  height: auto;
  margin: auto;
`;
const Cover = styled.div`
  display: flex;
`;

function CalendarComponents() {
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([
    // 더미데이터
    ["2022-03-03", "water"],
    ["2022-03-10", "water", "soil", "nutrition"],
    ["2022-03-11", "nutrition", "water"],
    ["2022-03-12", "soil"],
    ["2022-03-14", "water"],
    ["2022-03-25", "water"],
    ["2022-03-30", "water"],
  ]);

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
        tileContent={({ date, view }) => {
          for (let i = 0; i < mark.length; i++) {
            if (mark[i][0] === moment(date).format("YYYY-MM-DD")) {
              return (
                <Cover>
                  {mark[i].indexOf("water") !== -1 ? <FontAwesomeIcon className="fa-solid" icon={faDroplet} color="skyblue" /> : null}
                  {mark[i].indexOf("soil") !== -1 ? <FontAwesomeIcon className="fa-solid" icon={faThermometer} color="#D7DF01" /> : null}
                  {mark[i].indexOf("nutrition") !== -1 ? <FontAwesomeIcon className="fa-solid" icon={faRepeat} color="brown" /> : null}
                </Cover>
              );
            }
          }
        }}
      />
    </CalendarContainer>
  );
}
export default CalendarComponents;
