import React from "react";
import styled from "styled-components";

export const Content = styled.div`
  background-color: ${(props) => props.theme.mainColor};

  display: grid;
`;

const Mypage = () => {
  return (
    <Content>
      <p>이곳은 마이 페이지</p>
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

export default Mypage;
