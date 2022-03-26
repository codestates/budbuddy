import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { curDate } from "../modules/date";
import CustomCalendar from "../components/CustomCalendar";
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;

  .calendar {
    display: flex;
    align-self: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  margin-top: 0.4rem;
  font-size: 1.2rem;
  position: relative;
  display: inline-block;

  .calenda-btn {
    display: flex;
    justify-content: space-evenly;
  }

  .dropdown {
    display: flex;
    justify-content: center;
    margin-top: 0.4rem;
    z-index: 1;
    width: 100%;
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: ${(props) => props.theme.calendarBottomColor};
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }

  .dropdown-content {
    display: none;
  }

  .dropdown-content.show {
    display: block;
  }

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
`;
const CalendarBtn = styled.div`
  /* border: solid 1px black; */
  .display-bg {
    width: 60%;
    display: flex;
    justify-content: center;
    /* border: solid 1px red; */
    /* padding: 0.1rem 0; */
  }

  .display-day {
    padding-left: 0.5rem;
    width: 100%;
    border: none;
    border-radius: ${(props) => props.theme.borderRadius};
  }
  .icon-bg {
    /* border: solid 1px black; */
    padding: 0 0.3rem;
    border-radius: ${(props) => props.theme.borderRadius};
    color: SlateGrey;
    background-color: LightGrey;
  }

  .icon-bg:hover {
    color: ${(props) => props.theme.hoverColor};
  }

  .icon {
    transform: translateY(10%);
  }
`;
const Calendar = styled.div``;

const DatePicker = ({ className }) => {
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    inputRef.current.readOnly = false;
    inputRef.current.value = curDate();
    inputRef.current.readOnly = true;
  }, []);

  function openCalendar() {
    // inputRef.current.readOnly = false;
    // inputRef.current.value = "3/14";
    // inputRef.current.readOnly = true;

    dropdownRef.current.className = "dropdown-content show";
  }

  function closeCalendar() {
    dropdownRef.current.className = "dropdown-content";
  }

  return (
    <Layout className={className}>
      <Wrapper>
        <CalendarBtn className="calenda-btn">
          <div className="display-bg">
            <div className="display-bg">
              <input ref={inputRef} className="display-day" readOnly></input>
            </div>
            <div className="icon-bg" onClick={openCalendar}>
              <FontAwesomeIcon className="icon" icon={faCalendarDays} />
            </div>
          </div>
        </CalendarBtn>
        <div className="dropdown">
          <div ref={dropdownRef} className="dropdown-content">
            <CustomCalendar className="custom-calendar" />
            <div className="btn-wrap">
              <button onClick={closeCalendar} className="done">
                선택완료
              </button>
              <button onClick={closeCalendar} className="cancel">
                선택취소
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default DatePicker;
