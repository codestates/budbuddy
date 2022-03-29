import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AccountDelete from "../components/MyPage/AccountDelete";
import ChangePassword from "../components/MyPage/ChangePassword";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Test = () => {
  return (
    <Layout>
      <ChangePassword></ChangePassword>
    </Layout>
  );
};

export default Test;
