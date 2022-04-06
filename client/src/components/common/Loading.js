import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  position: ${(props) => (props.isAb ? "absolute" : "relative")};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  width: 100%;
  min-height: ${(props) => props.theme.backgroundImgHeight};
  top: ${(props) => {
    return props.top + "%";
  }};
  left: ${(props) => props.left + "%"};

  .box {
    width: ${(props) => props.theme.loadingPointerSize};
    height: ${(props) => props.theme.loadingPointerSize};

    border-radius: 50%;
    background-color: #fff;
    animation: loading 1s ease-in-out infinite;
  }

  .box:before {
    content: "";
    position: absolute;
    background-color: rgba(255, 255, 255, 0.9);
    top: 0px;
    left: -20px;
    height: ${(props) => props.theme.loadingPointerSize};
    width: ${(props) => props.theme.loadingPointerSize};
    border-radius: 50%;
  }

  .box:after {
    content: "";
    position: absolute;
    background-color: rgba(255, 255, 255, 0.9);
    top: 0px;
    left: 20px;
    height: ${(props) => props.theme.loadingPointerSize};
    width: ${(props) => props.theme.loadingPointerSize};
    border-radius: 50%;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }
`;

const Loading = ({ isAb = true, top = 50, left = 50, bgColor }) => {
  return (
    <Layout className="shell" isAb={isAb} top={top} left={left} bgColor={bgColor}>
      <div className="box">
        <div></div>
      </div>
    </Layout>
  );
};
export default Loading;
