import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import DatePicker from "../components/DatePicker";
import PlantManageToggle from "../components/write/PlantManageToggle";
import GrowInput from "../components/write/GrowInput";
import TextContent from "../components/write/TextContent";

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  .logo {
    margin-top: 1.5rem;
  }

  .date-picker {
    display: flex;
    align-self: center;
    justify-content: center;
    flex-direction: column;
  }
  .manage-toggle {
  }
  .grow-input {
  }
`;

const WriteBtn = styled.div``;

const Test = () => {
  return (
    <Layout>
      <Logo className="logo" />
      <DatePicker className="date-picker" />
      <PlantManageToggle className="manage-toggle" />
      <GrowInput className="grow-input" />
      <TextContent />
      <WriteBtn />
    </Layout>
  );
};

export default Test;
