import React from "react";
import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;

  .shell {
    background: lightGrey;
  }

  .cap-wrap {
    text-align: center;
  }

  .leftcap,
  .rightcap {
    font-size: 1rem;
    padding: 1%;
    margin: 5px;
    border: none;
    border-radius: ${(props) => props.theme.borderRadius};
  }

  .leftcap {
    /* width: 28%; */
    float: left;
    margin-left: 10px;
    background-color: rgba(0, 0, 0, 0);
  }
  .rightcap {
    cursor: pointer;
    float: right;
    margin-right: 10px;
    transition: color 0.25s cubic-bezier(0, 1.23, 1, 0.55);
  }

  .rightcap:hover {
    background-color: ${(props) => props.theme.hoverColor};
    color: white;
  }
`;

const TabBtnOne = ({ className = "", tabName, btnName, fn }) => {
  function clickExcute(e) {
    e.preventDefault();
    if (typeof fn === "function") {
      console.log("탭 함수 내부");
      fn();
    }
  }

  return (
    <Layout className={`${className}`}>
      <div className="shell">
        <div className="cap-wrap">
          <button className="leftcap">{tabName}</button>
          <button className="rightcap" onClick={clickExcute}>
            {btnName}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default TabBtnOne;
