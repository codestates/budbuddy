import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import DatePicker from "../components/DatePicker";
import PlantManageToggle from "../components/write/PlantManageToggle";
import GrowInput from "../components/write/GrowInput";
import TextContent from "../components/write/TextContent";
import PopupBtn from "../components/write/PopupBtn";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 3rem;
  position: relative;

  .logo {
    margin-top: 1rem;
  }

  .popup-btn {
    margin: 1rem 0;
  }

  .date-picker {
  }

  .manage-toggle {
    margin-left: 1rem;
  }
  .grow-input {
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
  .text-content {
    margin-top: 1.5rem;
  }
`;

const WriteBtn = styled.div`
  .btn-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .check-wrap {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 20px;

    .ch {
      width: 16px;
      height: 16px;
    }

    .ch-text {
      margin-left: 0.5rem;
    }
  }

  .write {
    align-self: center;
    width: 20%;
    margin-left: 0.25rem;
    font-size: ${(props) => props.theme.fontWritePageSmall};
    padding: 3px;
    border: none;
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: ${(props) => props.theme.btnBgColor};
    transition: background-color 0.2s ease;
  }
  .write:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const Test = () => {
  const [dpRef, setDpRef] = useState(null);
  const [dateDisplayRef, setDateDisplayRef] = useState(null);

  useEffect(() => {}, []);

  function openCalendar() {
    dpRef.current.classList.remove("hidden");
  }

  return (
    <Layout name="test">
      <Logo className="logo" />
      <PopupBtn className="popup-btn" onClick={openCalendar} setDateDisplayRef={setDateDisplayRef} />
      <DatePicker className={"date-picker hidden"} top={90} setDpRef={setDpRef} dateDisplayRef={dateDisplayRef} />
      <PlantManageToggle className="manage-toggle" />
      <GrowInput className="grow-input" />
      <TextContent className="text-content" />
      <WriteBtn>
        <div className="btn-wrapper">
          <div className="check-wrap">
            <input className="ch" type="checkbox" />
            <span className="ch-text">공개하기</span>
          </div>
          <button className="write" type="submit">
            기록하기
          </button>
        </div>
      </WriteBtn>
    </Layout>
  );
};

export default Test;
