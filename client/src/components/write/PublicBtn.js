import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  .btn-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .check-wrap {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 20px;

    .ch {
      width: 16px;
      height: 16px;
    }

    .ch-text {
      margin-left: 0.5rem;
    }
  }

  .write {
    align-self: center;
    width: 20%;
    margin-left: 0.25rem;
    font-size: ${(props) => props.theme.fontWritePageSmall};
    padding: 3px;
    border: none;
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: ${(props) => props.theme.btnBgColor};
    transition: background-color 0.2s ease;
  }
  .write:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const PublicBtn = ({ className = "" }) => {
  return (
    <Layout className={className}>
      <div className="btn-wrapper">
        <div className="check-wrap">
          <input className="ch" type="checkbox" name="checkbox" />
          <span className="ch-text">공개하기</span>
        </div>
        <button className="write" type="submit">
          기록하기
        </button>
      </div>
    </Layout>
  );
};
export default PublicBtn;
