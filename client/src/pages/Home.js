import React from "react";
import styled from "styled-components";

export const Content = styled.div`
  background-color: ${(props) => props.theme.mainColor};

  display: grid;
`;

const Home = () => {
  return (
    <Content>
      <p>안녕하세요! 자신의 식물을 일기처럼 기록해보세요.</p>
      <div>리스트1</div>
      <div>리스트1</div>
      <div>리스트1</div>
      <div>리스트1</div>
      <div>리스트1</div>
      <div>리스트1</div>
      <div>리스트1</div>
    </Content>
  );
};

export default Home;
