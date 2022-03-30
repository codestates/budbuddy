import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TabBtnOne from "../components/TabBtnOne";
import { useNavigate } from "react-router-dom";

const Layout = styled.form``;

const Test2 = () => {
  let navigate = useNavigate();
  return (
    <Layout>
      <TabBtnOne
        className="tab"
        tabName={"일지보기"}
        btnName={"뒤로가기"}
        fn={() => {
          navigate(-1);
        }}
      />
    </Layout>
  );
};

export default Test2;
