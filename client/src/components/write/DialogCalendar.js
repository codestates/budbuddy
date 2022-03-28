import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CustomCalendar from "./CustomCalendar";
import { curDate } from "../../modules/date";
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  /* border: solid 1px black; */

  position: absolute;
  &.hidden {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: solid 1px red; */
  width: 100%;

  position: relative;

  .calendar-fragment {
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: ${(props) => props.theme.calendarBottomColor};
    width: 80%;
    position: relative;
    top: ${(props) => props.top + "px"};
    left: ${(props) => props.left + "px"};

    .btn-wrap {
      display: flex;
      justify-content: space-evenly;

      > button {
        font-size: 1.2rem;
        padding: 3px;
        border: none;
        border-radius: ${(props) => props.theme.borderRadius};
        transition: background-color 0.2s ease;
      }

      .done:hover {
        background-color: ${(props) => props.theme.hoverColor};
      }
      .cancel:hover {
        background-color: ${(props) => props.theme.hoverCancleColor};
      }

      margin-bottom: 0.5rem;
    }
  }
`;

const DialogCalendar = ({ top = 100, left = 0, setDpRef, dateDisplayRef }) => {
  const calendarRef = useRef(null);
  let selectedDate = "";

  useEffect(() => {
    setDpRef(calendarRef);
  }, []);

  function selectDate(date) {
    selectedDate = date;
  }

  function close() {
    calendarRef.current.classList.add("hidden");
  }

  function selected() {
    // console.log(dateDisplayRef.current);
    dateDisplayRef.current.readOnly = false;
    if (selectedDate === "") dateDisplayRef.current.value = curDate();
    else dateDisplayRef.current.value = selectedDate;
    dateDisplayRef.current.readOnly = true;
    close();
  }

  return (
    <Layout ref={calendarRef} name="layout" className="hidden">
      <Wrapper top={top} left={left}>
        <div className="calendar-fragment">
          <CustomCalendar fn={selectDate} />
          <div className="btn-wrap">
            <button className="done" onClick={selected}>
              선택완료
            </button>
            <button className="cancel" onClick={close}>
              선택취소
            </button>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default DialogCalendar;
