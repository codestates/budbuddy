import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TabBtnOne from "../components/common/TabBtnOne";
import { useNavigate } from "react-router-dom";

const Layout = styled.form`
  .test {
    color: blue;
    background-color: yellow;
    border: none;
  }

  .test:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

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
      <button className="test">보기</button>
    </Layout>
  );
};

export default Test2;
