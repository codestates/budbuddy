import React, { useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px 0px 0px;
`;
const WritingEachSection = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 12.5%);
  grid-template-areas: " writingDay writingDay writingTitlePart writingTitlePart writingTitlePart writingTitlePart writingEdit writingDelete ";
  height: 4vh;
  > .writingDay {
    grid-area: writingDay;
    font-size: 0.8em;
    line-height: 4vh;
  }
  > .writingTitlePart {
    grid-area: writingTitlePart;
    text-align: center;
    font-size: 0.8em;
    line-height: 4vh;
  }
  > .writingEdit {
    grid-area: writingEdit;
    border-radius: ${(props) => props.theme.borderRadius};
    margin: 3px;
    cursor: pointer;
  }
  > .writingDelete {
    grid-area: writingDelete;
    border-radius: ${(props) => props.theme.borderRadius};
    margin: 3px;
    cursor: pointer;
  }
`;

function MyWritings({ writingValues }) {
  return (
    <Layout>
      {writingValues.map((el) => {
        return (
          <WritingEachSection key={el.number}>
            <div className="writingDay">{el.day}</div>
            <div className="writingTitlePart">{el.writingTitle}</div>
            <button className="writingEdit">수정</button>
            <button className="writingDelete">삭제</button>
          </WritingEachSection>
        );
      })}
    </Layout>
  );
}
export default MyWritings;
