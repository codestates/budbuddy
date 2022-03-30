import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TabBtnOne from "../components/common/TabBtnOne";
import PlantManageToggle from "../components/write/PlantManageToggle";
import TextContent from "../components/write/TextContent";
import { useNavigate, useLocation } from "react-router-dom";
import PublicBtn from "../components/write/PublicBtn";
const qs = require("query-string");

const Layout = styled.form`
  display: flex;
  flex-direction: column;

  .TabBtnOne {
    margin-top: 2rem;
  }
  .date {
    margin-top: 1rem;
    margin-left: 1rem;
  }
  .toggle {
    margin-top: 0.5rem;
    margin-left: 1rem;
    margin-bottom: 2rem;
  }

  .size {
    margin-top: 0.5rem;
    margin-left: 1rem;
  }
`;

const DailyRead = () => {
  let navigate = useNavigate();
  const parsed = qs.parse(useLocation().search);
  console.log(JSON.parse(decodeURI(parsed.info)));
  const info = JSON.parse(decodeURI(parsed.info));

  return (
    <Layout>
      <TabBtnOne
        className="TabBtnOne"
        tabName={"일지보기"}
        btnName={"뒤로가기"}
        fn={() => {
          navigate(-1);
        }}
      />
      <div>
        <div className="date">22/2/22</div>
      </div>
      <PlantManageToggle className="toggle" />
      <div>
        <div className="size">{`현재 키: ${info.size}`}</div>
      </div>
      <TextContent title={info.title} content={info.body} />
      <PublicBtn />
    </Layout>
  );
};

export default DailyRead;
