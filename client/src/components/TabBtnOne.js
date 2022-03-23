import React from "react";
import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;

  .shell {
    background: lightGrey;
  }

  .tab {
    text-align: center;
  }

  .leftcap {
    float: left;
    margin: 10px;
    margin-left: 0.1vh;
  }
  .rightcap {
    cursor: pointer;
    float: right;
    border: none;
    margin: 10px;
    margin-right: 2vh;
    transition: color 0.25s cubic-bezier(0, 1.23, 1, 0.55);
  }

  .rightcap:hover {
    background-color: Teal;
    color: white;
  }
  .leftcap,
  .rightcap {
    width: 25%;
    height: 100%;
    font-size: 1.8vh;
    padding: 5px;
  }
`;

const TabBtnOne = ({ tabName, btnName }) => {
  return (
    <Layout>
      <div className="shell">
        <div className="tab">
          <div className="leftcap">{tabName}</div>
          <button className="rightcap">{btnName}</button>
        </div>
      </div>
    </Layout>
  );
};

export default TabBtnOne;
