import React from "react";
import styled from "styled-components";
import Logo from "../components/Logo";

const Layout = styled.div`
  display: grid;
`;

const Album = () => {
  return (
    <Layout>
      <Logo />
    </Layout>
  );
};

export default Album;
