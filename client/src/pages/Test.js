import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
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

const Test = () => {
  return (
    <Layout>
      <SideBar></SideBar>
    </Layout>
  );
};

export default Test;
