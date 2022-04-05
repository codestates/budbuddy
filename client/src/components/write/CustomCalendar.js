import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import moment from "moment";
import timeStore, { months } from "../../store/timeStore";

const Content = styled.div`
  .Wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .calendar {
    width: 100%;
  }

  .month {
    border-radius: ${(props) => props.theme.borderRadius} ${(props) => props.theme.borderRadius} 0 0;
    width: 100%;
    background-color: ${(props) => props.theme.calendarTopColor};

    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 10px 10px;
  }

  .weekends {
    background-color: ${(props) => props.theme.calendarMidColor};
    color: #fff;
    padding: 7px 0;
    display: flex;
  }

  .days {
    display: flex;
    flex-wrap: wrap;
    font-weight: 300;
    padding: 5px 0;
    background-color: ${(props) => props.theme.calendarBottomColor};
  }
  .days div {
    border-radius: ${(props) => props.theme.borderRadius};
    margin-bottom: 5px;
    padding: 10px 0;
    transition: all 0.1s ease-out;
  }

  .weekends div,
  .days div {
    width: 14.28%;
    text-align: center;
  }

  .days div:hover:not(.today) {
    background-color: #dfe6e9;
    cursor: pointer;
  }
  .today {
    background-color: #27ae60;
    color: #fff;
  }

  .today:hover {
    background-color: teal;
    color: #fff;
  }

  .prev_date {
    color: DarkGrey;
  }

  .prev,
  .next {
    width: 35px;
    height: 35px;
    background-color: rgba(0, 0, 0, 0.07);
    border-radius: 20%;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${(props) => props.theme.fontCalendarArrowBtn};
    transition: all 0.4s;
  }

  .prev:hover,
  .next:hover {
    background-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }

  .curMonth {
    font-size: ${(props) => props.theme.fontWritePageXLarge};
    font-weight: bold;
  }
  .curDate {
    margin-top: 0.3rem;
    font-size: ${(props) => props.theme.fontWritePageSmall};
    font-weight: 100;
  }
`;

function CustomCalendar({ fn }) {
  const [cells, setCells] = useState([]);
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [preDayIdx, setPreDayIdx] = useState(0);
  const daysRef = useRef(null);
  const { dt } = timeStore();

  function calcFirstDay(endDay, endDate) {
    let gap = Math.abs(endDate % 7, endDay) - 1;
    if (endDay - gap < 0) {
      endDay += 7;
    }
    return endDay - gap;
  }

  useEffect(() => {
    MakeCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dt]);

  function MakeCalendar() {
    //
    if (preDayIdx !== 0) daysRef.current.children[preDayIdx].className = "";
    setMonth(months[dt.getMonth()]); //달력 상단 날짜 표기

    const seletedDate = date.split("/");
    const endDay = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDay();
    const endDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
    const firstDay = calcFirstDay(endDay, endDate);
    const prevDate = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();

    let cells = [];
    for (let i = firstDay; i > 0; i--) {
      cells.push({ className: "prev_date", day: prevDate - i + 1 });
    }
    for (let i = 1; i <= endDate; i++) {
      if (seletedDate[1] * 1 === dt.getMonth() + 1 && seletedDate[0] === moment(dt).format("YY") && seletedDate[2] * 1 === i) {
        cells.push({ className: "today", day: i });
      } else cells.push({ className: "", day: i });
    }
    setCells(cells);
  }

  function moveDate(dir) {
    if (dir === "prev") {
      dt.setMonth(dt.getMonth() - 1);
    } else if (dir === "next") {
      dt.setMonth(dt.getMonth() + 1);
    }
    MakeCalendar();
  }

  function pickDay(idx) {
    let pickDay = "";

    if (preDayIdx !== 0) daysRef.current.children[preDayIdx].className = "";

    if (daysRef.current.children[idx].className !== "prev_date") {
      daysRef.current.children[idx].className = "today";
      pickDay = daysRef.current.children[idx].textContent;
    }

    setPreDayIdx(idx);

    const year = moment(dt).format("YYYY");
    fn(`${year}/${dt.getMonth() + 1}/${pickDay}`);
    setDate(`${year}/${month}/${pickDay}`);
  }

  return (
    <Content>
      <div className="Wrapper">
        <div className="calendar">
          <div className="month">
            <div
              className="prev"
              onClick={() => {
                moveDate("prev");
              }}>
              <span>&#10094;</span>
            </div>
            <div>
              <span className="curMonth">{month + "월"}</span>
              <p className="curDate">{"선택날짜: " + date}</p>
            </div>
            <div className="next" onClick={() => moveDate("next")}>
              <span>&#10095;</span>
            </div>
          </div>
          <div className="weekends">
            <div>일</div>
            <div>월</div>
            <div>화</div>
            <div>수</div>
            <div>목</div>
            <div>금</div>
            <div>토</div>
          </div>
          <div className="days" ref={daysRef}>
            {cells.map((v, i) => {
              return (
                <div key={i} className={v.className} onClick={() => pickDay(i)}>
                  {v.day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Content>
  );
}

export default CustomCalendar;
