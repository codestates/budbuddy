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
    margin-left: 0vh;
    background-color: rgba(0, 0, 0, 0);
  }
  .rightcap {
    cursor: pointer;
    float: right;
    margin-right: 2vh;
    transition: color 0.25s cubic-bezier(0, 1.23, 1, 0.55);
  }

  .rightcap:hover {
    background-color: ${(props) => props.theme.hoverColor};
    color: white;
  }

  .leftcap,
  .rightcap {
    width: 10vh;
    font-size: 1.7vh;
    padding: 0.3vh;
    margin: 5px;
    border: none;
  }
`;

const TabBtnOne = ({ className = "", tabName, btnName }) => {
  return (
    <Layout>
      <div className={`shell ${className}`}>
        <div className="tab">
          <button className="leftcap">{tabName}</button>
          <button className="rightcap">{btnName}</button>
        </div>
      </div>
    </Layout>
  );
};

export default TabBtnOne;
