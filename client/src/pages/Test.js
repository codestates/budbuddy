import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import Logo from "../components/Logo";
import DatePicker from "../components/DatePicker";
import PlantManageToggle from "../components/PlantManageToggle";

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
`;

const Test = () => {
  return (
    <Layout>
      <SideBar></SideBar>
    </Layout>
  );
};

export default Test;
