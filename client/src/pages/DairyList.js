import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import TabBtnOne from "../components/TabBtnOne";
import Logo from "../components/Logo";
import DiaryList from "../components/write/list/DiaryList";
import { useNavigate } from "react-router-dom";
import { dummyList } from "../utils/dummy";
const qs = require("query-string");

const Layout = styled.div`
  .logo {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const DairyList = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const parsed = qs.parse(search);
  const name = decodeURI(parsed.name);
  const plant_id = decodeURI(parsed.plant_id);
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
      <DiaryList diaryList={dummyList} />
    </Layout>
  );
};
export default DairyList;
