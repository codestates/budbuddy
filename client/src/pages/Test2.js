import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TabBtnOne from "../components/common/TabBtnOne";
import { useNavigate } from "react-router-dom";
import GoBack from "../components/write/GoBack";

const Layout = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;

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
      <GoBack top={22} left={58} width={20} fn={() => {}} />
    </Layout>
  );
};

export default Test2;
