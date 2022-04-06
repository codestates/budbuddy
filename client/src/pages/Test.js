import React from "react";
import styled from "styled-components";
import TabOption from "../components/Album/TabOption";
import ChartComponent from "../components/MyPlantsRecord/ChartComponent";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  .placed {
    margin: auto;
  }
`;

const Test = () => {
  const data = [{ value: 30 }, { value: 50 }];
  return (
    <Layout>
      <ChartComponent data={data}></ChartComponent>
    </Layout>
  );
};

export default Test;
