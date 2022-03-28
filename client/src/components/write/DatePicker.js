import React, { useState } from "react";
import styled from "styled-components";
import DialogCalendar from "./DialogCalendar";
import PopupBtn from "./PopupBtn";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

function DatePicker({ className }) {
  const [dpRef, setDpRef] = useState(null);
  const [dateDisplayRef, setDateDisplayRef] = useState(null);

  function openCalendar() {
    dpRef.current.classList.remove("hidden");
  }

  return (
    <>
      <PopupBtn className="popup-btn" onClick={openCalendar} setDateDisplayRef={setDateDisplayRef} />
      <DialogCalendar className={"date-picker hidden"} top={90} setDpRef={setDpRef} dateDisplayRef={dateDisplayRef} />
    </>
  );
}

export default DatePicker;
