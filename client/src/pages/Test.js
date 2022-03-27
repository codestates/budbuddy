import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
export const Layout = styled.div``;
import Logo from "../components/Logo";
import DatePicker from "../components/DatePicker";

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  .logo {
    margin-top: 1.5rem;
  }

  .calendar {
    display: flex;
    align-self: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const PlantManageToggle = styled.div``;
const PlantGrowDropdown = styled.div``;
const Content = styled.div``;
const WriteBtn = styled.div``;

const Test = () => {
  return (
    <Layout>
      <SideBar></SideBar>
      <Logo className="logo" />
      <DatePicker className="calendar" />
      <PlantManageToggle />
      <PlantGrowDropdown />
      <Content />
      <WriteBtn />
    </Layout>
  );
};

export default Test;
