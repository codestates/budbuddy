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
    font-size: ${(props) => props.theme.fontWritePageXSmall};
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

const TabOption = ({ className = "", tabName, setPickPlantValue, setPickDateValue, listByUserId, currentUser = "" }) => {
  const UserPlantsName = listByUserId.reduce((acc, cur) => {
    if (!acc.includes(cur.Plant.name) && cur.Journal_Images.length !== 0) {
      acc.push(cur.Plant.name);
    }
    return acc;
  }, []);

  const UserPlantsDate = listByUserId.reduce((acc, cur) => {
    let SelectDate = cur.date_pick;
    if (!acc.includes(SelectDate) && cur.Journal_Images.length !== 0) {
      acc.push(SelectDate);
    }
    return acc;
  }, []);

  const OptionDateValue = (e) => {
    setPickDateValue(e.target.value);
  };
  const OptionPlantValue = (e) => {
    setPickPlantValue(e.target.value);
  };
  return (
    <Layout className={`${className}`}>
      <div className="shell">
        <div className="cap-wrap">
          <button className="leftcap">{tabName}</button>
          <select defaultValue="날짜" className="rightcap" onChange={(e) => OptionDateValue(e)}>
            <option>날짜</option>
            {UserPlantsDate.map((el) => {
              return <option key={el}>{el}</option>;
            })}
          </select>
          <select defaultValue={currentUser || "식물이름"} className="rightcap" onChange={(e) => OptionPlantValue(e)}>
            <option>식물이름</option>
            {UserPlantsName.map((el) => {
              return <option key={el}>{el}</option>;
            })}
          </select>
        </div>
      </div>
    </Layout>
  );
};

export default TabOption;
