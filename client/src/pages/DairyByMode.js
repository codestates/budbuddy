import React from "react";
import styled from "styled-components";
import TabBtnOne from "../components/common/TabBtnOne";
import PlantManageToggle from "../components/write/PlantManageToggle";
import TextContent from "../components/write/TextContent";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import PublicBtn from "../components/write/PublicBtn";
import axios from "axios";
import DatePicker from "../components/write/DatePicker";
import GrowInput from "../components/write/GrowInput";

const qs = require("query-string");

const Layout = styled.form`
  display: flex;
  flex-direction: column;

  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 3rem;
  position: relative;

  .date-picker {
    margin-top: 1rem;
    margin-left: 1rem;
  }
  .TabBtnOne {
    margin-top: 2rem;
  }

  .toggle {
    margin-top: 1rem;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
  }

  .grow-input {
    margin-top: 0.5rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
`;

const DairyByMode = () => {
  const navigate = useNavigate();
  const params = useParams();
  const parsed = qs.parse(useLocation().search);
  const info = JSON.parse(decodeURI(parsed.info));

  console.log(params.mode);

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

    let { title, content, checkbox, toggle, date, size } = e.target;
    const convertDate = date.value.replaceAll("/", "-");

    toggle = JSON.parse(toggle.value);
    const toggleArr = [];
    if (!toggle.isWater) {
      toggleArr.push("water");
    }
    if (!toggle.isFertilize) {
      toggleArr.push("fertilize");
    }
    if (!toggle.isRepot) {
      toggleArr.push("repot");
    }

    const payload = {
      actions: toggleArr,
      plant_id: info.plant_id,
      title: title.value,
      body: content.value,
      date_pick: convertDate,
      public: checkbox.checked,
      plant_height: size.value,
    };

    try {
      await axios.put(process.env.REACT_APP_API_URL + `/journals/${info.id}`, payload);
      navigate("/mypage");
    } catch (err) {
      console.log("write page:submit:::", err);
    }
  }

  let src = null;
  info.actions = convertToggleData(info.Journal_Actions);

  if (info.Journal_Images.length !== 0) {
    src = info.Journal_Images[0].Image.store_path;
  }

  let journalName = "삭제된 식물";
  if (info.Plant) {
    journalName = info.Plant.name;
  }

  return (
    <Layout onSubmit={submit}>
      <TabBtnOne
        className="TabBtnOne"
        tabName={`${journalName}의 일지보기`}
        btnName={"뒤로가기"}
        fn={() => {
          navigate(-1);
        }}
      />
      <DatePicker className="date-picker" top={130} />
      <PlantManageToggle className="toggle" actions={info.actions} mode={params.mode} />
      <GrowInput className="grow-input" />
      <TextContent title={info.title} content={info.body} src={src} mode={params.mode} />
      <PublicBtn isPublic={info.public} mode={params.mode} />
    </Layout>
  );
};

export default DairyByMode;
