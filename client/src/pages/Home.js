import React from "react";
import styled from "styled-components";
import TextOnImg from "../components/common/TextOnImg";
import Hr from "../components/common/Hr";
import ImgSlide from "../components/common/ImgSlide";
import { proverbs, slideImgs } from "../resources";

const Layout = styled.div`
  .version {
    padding-top: 0.5rem;
    margin: 0 0 3rem 0.5rem;
    font-size: 0.4rem;
    color: gray;
  }
  .greeting {
    padding: 0rem 0rem 1rem 0.5rem;
    white-space: pre;
  }
`;

const Home = () => {
  return (
    <Layout>
      <p className="version">ver1.0</p>
      <p className="greeting">{`안녕하세요!\n자신의 식물을 일기처럼 기록해보세요!`}</p>
      <TextOnImg texts={proverbs} />
      <Hr t={4} b={4} width={80} />
      <ImgSlide images={slideImgs} />
    </Layout>
  );
};

export default Home;
