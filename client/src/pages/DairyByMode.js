import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TabBtnOne from "../components/common/TabBtnOne";
import PlantManageToggle from "../components/write/PlantManageToggle";
import TextContent from "../components/write/TextContent";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import PublicBtn from "../components/write/PublicBtn";
import moment from "moment";
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

const DairyByMode = () => {
  const navigate = useNavigate();
  const params = useParams();
  const parsed = qs.parse(useLocation().search);
  const info = JSON.parse(decodeURI(parsed.info));

  function convertToggleData(toggleArr) {
    let toggle = { isWater: false, isFertilize: false, isRepot: false };
    for (let i = 0; i < toggleArr.length; i++) {
      const std = toggleArr[i].Action.type;
      if (std === "repot") {
        toggle.isRepot = true;
      } else if (std === "fertilize") {
        toggle.isFertilize = true;
      } else if (std === "water") {
        toggle.isWater = true;
      }
    }

    return toggle;
  }

  async function submit(e) {
    e.preventDefault();
    console.log("글 수정 ajax call 작성 란");
  }

  let src = null;
  // console.log("DairyByMode:::", params.mode, info);
  info.actions = convertToggleData(info.Journal_Actions);
  if (info.Journal_Images.length !== 0) {
    src = info.Journal_Images[0].Image.store_path;
  }
  return (
    <Layout onSubmit={submit}>
      <TabBtnOne
        className="TabBtnOne"
        tabName={`${info.Plant.name}의 일지보기`}
        btnName={"뒤로가기"}
        fn={() => {
          navigate(-1);
        }}
      />
      <div>
        <div className="date">{moment(info.updatedAt).format("YY/MM/DD")}</div>
      </div>
      <PlantManageToggle className="toggle" actions={info.actions} mode={params.mode} />
      <div>
        <div className="size">{`현재 키: ${info.plant_height}cm`}</div>
      </div>
      <TextContent title={info.title} content={info.body} src={src} mode={params.mode} />
      <PublicBtn isPublic={info.public} mode={params.mode} />
    </Layout>
  );
};

export default DairyByMode;
