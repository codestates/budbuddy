import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  padding-top: 5rem;
  border: 5px solid yellow;
  position: absolute;
  min-width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const SlideModal = () => {
  return <Layout>이런 똥챔~</Layout>;
};

export default SlideModal;
