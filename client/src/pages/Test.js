import React from "react";
import styled from "styled-components";
import TabOption from "../components/Album/TabOption";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
  .shell {
    border: 3px solid red;
    width: 50%;
    height: 100%;
    position: absolute;
    left: 100%;
    transition: all 0.3s ease;
  }
  .shell:hover {
    left: 50%;
  }
`;

const Test = () => {
  return (
    <Layout>
      <div className="shell">안녕</div>
    </Layout>
  );
};

export default Test;
