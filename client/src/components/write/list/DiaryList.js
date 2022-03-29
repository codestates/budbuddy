import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${(props) => props.theme.fontWritePageMid};
    margin-top: 1.2rem;
  }
  .date-wrap {
    margin-left: 0.5rem;
    font-size: ${(props) => props.theme.fontWritePageSmall};
  }
  .btn-wrap {
    margin-right: 0.5rem;

    > button {
      font-size: ${(props) => props.theme.fontWritePageSmall};
      border: none;
      border-radius: ${(props) => props.theme.borderRadius};
      padding: 0.1rem 0.2rem;
      background-color: rgba(1, 1, 1, 0);
      transition: all 0.2s ease;
    }
  }

  .modify:hover {
    background-color: ${(props) => props.theme.hoverColor};
    color: #fff;
  }
  .delete {
    margin-left: 0.5rem;
  }
  .delete:hover {
    color: #fff;
    background-color: ${(props) => props.theme.hoverCancleColor};
  }

  .title {
    transition: color 0.2s ease;
    padding: 0.1rem 0.6rem;
  }
  .title:hover {
    color: ${(props) => props.theme.hoverColor};
  }
`;

const DiaryList = ({ diaryList }) => {
  //
  const callModify = () => {
    console.log("글 수정 요청 작성란");
  };
  const callDelete = () => {
    console.log("글 삭제 요청 작성란");
  };
  const callRead = () => {
    console.log("글 읽기 요청 작성란");
  };

  return (
    <Layout>
      {diaryList.map((v, i) => {
        return (
          <div key={i} className="wrap">
            <div className="date-wrap">
              <div>{v.date}</div>
            </div>
            <div className="title" onClick={callRead}>
              <div>{v.title}</div>
            </div>
            <div className="btn-wrap">
              <button className="modify" onClick={callModify}>
                수정
              </button>
              <button className="delete" onClick={callDelete}>
                삭제
              </button>
            </div>
          </div>
        );
      })}
    </Layout>
  );
};
export default DiaryList;
