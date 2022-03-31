import React, { useState } from "react";
import styled from "styled-components";
import { budDummy } from "../../utils/dummy";

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
    background-color: ${(props) => props.theme.calendarBottomColor};
    color: black;
  }
`;

const TabOption = ({ className = "", tabName, setPickValue }) => {
  const FillterBud = [];
  for (let i = 0; i < budDummy.length; i++) {
    if (!FillterBud.includes(budDummy[i].budName)) {
      FillterBud.push(budDummy[i].budName);
    }
  }

  const OptionValue = (e) => {
    setPickValue(e.target.value);
  };
  console.log("FillterBud", FillterBud);
  return (
    <Layout className={`${className}`}>
      <div className="shell">
        <div className="cap-wrap">
          <button className="leftcap">{tabName}</button>
          <select className="rightcap" onChange={(e) => OptionValue(e)}>
            <option>식물을 선택해주세요</option>
            {FillterBud.map((el) => {
              return <option key={el}>{el}</option>;
            })}
          </select>
        </div>
      </div>
    </Layout>
  );
};

export default TabOption;
