import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  /* display: flex; */
  /* border: solid 1px red; */
  margin: 0;
  .shell {
    width: 100%;
    display: flex;
    align-items: center;
    /* border: solid 1px black; */

    > div {
      /* width: 16%; */
      font-size: ${(props) => props.theme.fontWritePageMid};
      padding: 3px 0;
    }
  }

  .input-wrap {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: start;
  }

  .input {
    width: 70%;
    font-size: ${(props) => props.theme.fontWritePageSmall};
    text-align: end;
    border: none;
    border-radius: ${(props) => props.theme.borderRadius};
    margin-left: 0.5rem;
    margin-right: 0.1rem;
    padding-right: 0.2rem;
  }
`;

function GrowInput({ className }) {
  return (
    <Layout className={className}>
      <div className="shell">
        <div className="text-wrap">
          <span>현재 키:</span>
        </div>
        <div className="input-wrap">
          <input className="input" type="number" placeholder="0.0cm" step="0.1" min="0" max="300" name="size" />
          <span>cm</span>
        </div>
      </div>
    </Layout>
  );
}

export default GrowInput;
