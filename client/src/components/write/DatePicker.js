import React, { useState } from "react";
import DialogCalendar from "./DialogCalendar";
import PopupBtn from "./PopupBtn";

function DatePicker({ className, top = 100, left = 0 }) {
  const [dpRef, setDpRef] = useState(null);
  const [dateDisplayRef, setDateDisplayRef] = useState(null);

  function openCalendar() {
    dpRef.current.classList.remove("hidden");
  }

  return (
    <>
      <PopupBtn className={className} onClick={openCalendar} setDateDisplayRef={setDateDisplayRef} />
      <DialogCalendar top={top} left={left} setDpRef={setDpRef} dateDisplayRef={dateDisplayRef} />
    </>
  );
}

export default DatePicker;
