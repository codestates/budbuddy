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
  > .writingDay {
    grid-area: writingDay;
  }
  > .writingTitlePart {
    grid-area: writingTitlePart;
    text-align: center;
  }
  > .writingEdit {
    grid-area: writingEdit;
  }
  > .writingDelete {
    grid-area: writingDelete;
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
