import React from "react";
import { slideImgs, proverbs } from "../utils/dummy";
import styled from "styled-components";
import TextOnImg from "../components/TextOnImg";
import Hr from "../components/Hr";
import ImgSlide from "../components/ImgSlide";

export const Layout = styled.div`
  padding-top: ${(props) => props.theme.backgroundPaddingTop};

  .greeting {
    font-size: 1.6vh;
    padding: 0rem 0rem 1rem 0.5rem;
    white-space: pre;
  }
`;

const Home = () => {
  return (
    <Layout>
      <p className="greeting">{`안녕하세요!\n자신의 식물을 일기처럼 기록해보세요!`}</p>
      <TextOnImg texts={proverbs} />
      <Hr padding={4.5} width={90} />
      <ImgSlide images={slideImgs} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Layout>
  );
};

export default Home;
