import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import TabBtnOne from "../components/common/TabBtnOne";
import Logo from "../components/common/Logo";
import DiaryList from "../components/list/DiaryList";
import { useNavigate } from "react-router-dom";
import useAjaxStore from "../store/AjaxStore";
const qs = require("query-string");

const Layout = styled.div`
  .logo {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const DairyList = () => {
  const navigate = useNavigate();
  let { name, plant_id } = qs.parse(useLocation().search);
  name = decodeURI(name);

  const { listByPlantId, setListByPlantId } = useAjaxStore();

  useEffect(() => {
    setListByPlantId(plant_id);
  }, [plant_id, setListByPlantId]);

  console.log(listByPlantId);
  return (
    <Layout>
      <div>{`${name}: ${plant_id}`}</div>
      <Logo className="logo" />
      <TabBtnOne
        className="tab"
        tabName={`${name}의 글 목록`}
        btnName={"뒤로가기"}
        fn={() => {
          navigate(-1);
        }}
      />
      <DiaryList diaryList={listByPlantId} />
    </Layout>
  );
};
export default DairyList;
