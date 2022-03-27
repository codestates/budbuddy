import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
export const Layout = styled.div``;

const Test = () => {
  // const [isLogined, setLogin] = useState(false);

  // useEffect(() => {
  //   console.log("Test js 호출시점");
  //   const loginInfo = sessionStorage.getItem("loginInfo");
  //   console.log("[sessionStorage.getItem:::loginInfo]:", loginInfo);

  //   if (loginInfo) {
  //     setLogin(loginInfo.isLogined);
  //   }
  // });

  return (
    <Layout>
      <SideBar></SideBar>
    </Layout>
  );
};

export default Test;
