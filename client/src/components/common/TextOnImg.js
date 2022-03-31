import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useInterval } from "../../modules/hooks";
import { BGWrapper } from "../../styles/CommonStyled";

const Content = styled(BGWrapper)`
  display: grid;

  img {
    height: 27vh;
  }

  .ani {
    animation-name: textFloating;
    animation-duration: ${(props) => {
      return (props.textTime / 1000 / 2).toFixed(1) + "s";
    }};
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: cubic-bezier(0.14, 1.06, 0.9, 0.5);
  }

  @keyframes textFloating {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TextOnImg = ({ className = "", texts, time = 5000 }) => {
  const [idx, setIdx] = useState(0);

  const changeProverb = useCallback(() => {
    setIdx((pre) => {
      while (true) {
        const idx = parseInt(Math.random() * texts.length);
        if (pre !== idx) {
          return idx;
        }
      }
    });
  }, [texts.length]);

  useEffect(() => {
    changeProverb();
  }, [changeProverb]);

  useInterval(() => {
    changeProverb();
  }, time);

  return (
    <Content className={className} textTime={time}>
      <div className="std">
        <img src={`signupBg/IMG_8.png`} alt={`bg`} />
        <div className="backText ani">{texts[idx]}</div>
      </div>
    </Content>
  );
};

export default TextOnImg;
