import React from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import PlantManageToggle from "../components/write/PlantManageToggle";
import GrowInput from "../components/write/GrowInput";
import TextContent from "../components/write/TextContent";
import DatePicker from "../components/write/DatePicker";
import PublicBtn from "../components/write/PublicBtn";
import { useLocation } from "react-router-dom";
const qs = require("query-string");

const Layout = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 3rem;
  position: relative;

  .logo {
    margin-top: 1.3rem;
  }

  .date-picker {
    margin: 1rem 0;
  }

  .manage-toggle {
    margin-left: 1rem;
    margin-top: 0.3rem;
  }
  .grow-input {
    margin-left: 1rem;
    margin-top: 0.8rem;
  }
  .text-content {
    margin-top: 1.5rem;
  }

  .bud-name {
    display: flex;
    justify-content: center;
    font-size: ${(props) => props.theme.fontWritePageLarge};
    margin: 0.6rem 0 0rem 0;
    color: DarkSlateGray;
  }
`;

const Write = () => {
  //
  const { search } = useLocation();
  const parsed = qs.parse(search);
  const budName = decodeURI(parsed.name);
  const plant_id = decodeURI(parsed.plant_id);

  function convertToggleData(toggle) {
    const tgArr = [];
    if (toggle.isDrop) {
      tgArr.push("water");
    }
    if (toggle.isNutirition) {
      tgArr.push("fertillize");
    }
    if (toggle.isRepotting) {
      tgArr.push("repot");
    }

    return tgArr;
  }

  function submit(e) {
    console.log("ajax 작성 필요");
    e.preventDefault();
    const { date, size, title, photo, content, checkbox } = e.target;
    const convertDate = date.value.replaceAll("/", "-");
    let toggle = JSON.parse(e.target.toggle.value);
    toggle = convertToggleData(toggle);
    const payload = {
      images: [photo.value],
      actions: toggle,
      plant_height: size.value + "cm",
      plant_id,
      title: title.value,
      body: content.value,
      date_pick: convertDate,
      public: checkbox.checked,
    };
  }

  return (
    <Layout name="test" onSubmit={submit}>
      <Logo className="logo" />
      <div className="bud-name">
        <div>{`${budName}의 일지`}</div>
      </div>
      <DatePicker className="date-picker" top={130} />
      <PlantManageToggle className="manage-toggle" />
      <GrowInput className="grow-input" />
      <TextContent className="text-content" />
      <PublicBtn />
    </Layout>
  );
};

export default Write;
