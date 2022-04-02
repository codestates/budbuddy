import React, { useState, useRef } from "react";
import styled from "styled-components";

const Layout = styled.div`
  .jellybox {
    display: flex;
    position: absolute;
    width: 100px;
    height: 100px;
    border-color: transparent;
    background: #ff1616;
    animation: jelly 0.6s ease;
  }

  @keyframes jelly {
    from {
      transform: scale(1, 1);
    }
    30% {
      transform: scale(1.25, 0.75);
    }
    40% {
      transform: scale(0.75, 1.25);
    }
    50% {
      transform: scale(1.15, 0.85);
    }
    65% {
      transform: scale(0.95, 1.05);
    }
    75% {
      transform: scale(1.05, 0.95);
    }
    to {
      transform: scale(1, 1);
    }
  }
`;

const Test2 = () => {
  return (
    <Layout>
      <div className="jellybox"></div>
    </Layout>
  );
};

export default Test2;
