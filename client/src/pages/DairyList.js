import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
const qs = require("query-string");

export const Layout = styled.div``;

const DairyList = () => {
  const { search } = useLocation();
  const parsed = qs.parse(search);
  const plant_id = decodeURI(parsed.plant_id);
  return (
    <Layout>
      <div>{`plant_id: ${plant_id}`}</div>
    </Layout>
  );
};
export default DairyList;
