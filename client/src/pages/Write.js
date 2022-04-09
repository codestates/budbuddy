import React from "react";
import styled from "styled-components";
import Logo from "../components/common/Logo";
import PlantManageToggle from "../components/write/PlantManageToggle";
import GrowInput from "../components/write/GrowInput";
import TextContent from "../components/write/TextContent";
import DatePicker from "../components/write/DatePicker";
import PublicBtn from "../components/write/PublicBtn";
import { useLocation, useNavigate } from "react-router-dom";
import GoBack from "../components/write/GoBack";
import axios from "axios";
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
  const navigate = useNavigate();
  const { search } = useLocation();
  const parsed = qs.parse(search);
  const budName = decodeURI(parsed.name);
  const plant_id = decodeURI(parsed.plant_id);

  function convertToggleData(toggle) {
    const tgArr = [];
    if (!toggle.isWater) {
      tgArr.push("water");
    }
    if (!toggle.isFertilize) {
      tgArr.push("fertilize");
    }
    if (!toggle.isRepot) {
      tgArr.push("repot");
    }

    return tgArr;
  }

  async function submit(e) {
    e.preventDefault();
    const { date, size, title, upload_img, content, checkbox } = e.target;
    // 날짜
    const convertDate = date.value.replaceAll("/", "-");
    // 토글
    let toggle = JSON.parse(e.target.toggle.value);
    toggle = convertToggleData(toggle);

    console.log(toggle);
    // payload
    const payload = {
      images: [],
      actions: toggle,
      plant_height: size.value,
      plant_id,
      title: title.value,
      body: content.value,
      date_pick: convertDate,
      public: checkbox.checked,
    };

    if (upload_img.files.length === 0) {
      try {
        await axios.post(process.env.REACT_APP_API_URL + "/journals", payload);
        navigate("/daily");
      } catch (err) {
        console.log("write page:submit:::", err);
      }
    } else {
      //이미지
      let formdata = new FormData();
      formdata.append("image", upload_img.files[0]);
      try {
        const imgRes = await axios.post(process.env.REACT_APP_API_URL + "/images", formdata);
        payload["images"] = [imgRes.data.data.id];
        //이미지를 추가하고 이미지를 서버에 업로드하고 업로드 성공하면 글을 포스팅
        await axios.post(process.env.REACT_APP_API_URL + "/journals", payload);
        navigate("/daily");
      } catch (err) {
        console.log("write page:submit:::", err);
      }
    }
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
      <GoBack top={22} left={94} width={6} />
    </Layout>
  );
};

export default Write;
