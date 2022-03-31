import React from "react";
import styled from "styled-components";
import TabOption from "../components/Album/TabOption";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Test = () => {
  return (
    <Layout>
      <TabOption tabName={"앨범"}></TabOption>
    </Layout>
  );
};

export default Test;
