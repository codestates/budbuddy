import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextOnImg from "../components/common/TextOnImg";
import Hr from "../components/common/Hr";
import ImgSlide from "../components/common/ImgSlide";
import { dummy } from "../resources";

const Layout = styled.div`
  padding-top: 5rem;

  .greeting {
    padding: 0rem 0rem 1rem 0.5rem;
    white-space: pre;
  }
`;

const Home = () => {
  useEffect(() => {
    read();
  }, []);

  const [data, setData] = useState({});

  async function read() {
    setData(dummy);
  }

  return (
    <Layout>
      <p className="greeting">{`안녕하세요!\n자신의 식물을 일기처럼 기록해보세요!`}</p>
      <TextOnImg texts={data.proverbs} />
      <Hr t={4} b={4} width={80} />
      <ImgSlide images={data.slide} />
    </Layout>
  );
};

export default Home;
