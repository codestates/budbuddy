import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImgUpload from "../components/common/ImgUpload";
import { useNavigate } from "react-router-dom";

const Layout = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Test2 = () => {
  let navigate = useNavigate();
  return (
    <Layout>
      <ImgUpload />
    </Layout>
  );
};

export default Test2;
