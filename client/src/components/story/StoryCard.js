import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  border: solid 1px black;
  width: 100%;
  margin: 0 auto;

  .shell {
    border: solid 1px red;
    width: 100%;
  }

  .wrap {
    border: solid 1px yellow;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-evenly;
    width: 100%;
    gap: 1rem 0rem;
  }

  .card-wrap {
    border: solid 1px blue;
    width: 190px;
    height: 150px;
  }
`;

const StoryCard = ({ storyList }) => {
  return (
    <Layout>
      <div className="shell">
        <div className="wrap">
          <div className="card-wrap"></div>
          <div className="card-wrap"></div>
          <div className="card-wrap"></div>
          <div className="card-wrap"></div>
          <div className="card-wrap"></div>
          <div className="card-wrap"></div>
          <div className="card-wrap"></div>
        </div>
      </div>
    </Layout>
  );
};
export default StoryCard;
