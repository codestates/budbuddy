import React from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import TabBtnOne from "../components/TabBtnOne";
export const Layout = styled.div``;

//식물 추가 탭
//카드 컴포넌트
//<Logo />
const Daily = ({ tabName, btnName }) => {
  return (
    <Layout>
      <Logo />
      <TabBtnOne tabName={"내 식물"} btnName={"내 식물 추가"} />
    </Layout>
  );
};

export default Daily;
