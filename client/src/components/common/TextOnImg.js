import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useInterval } from "../../modules/hooks";
import { BGWrapper } from "../../styles/CommonStyled";

const Content = styled(BGWrapper)`
  display: grid;
  img {
    height: ${(props) => props.theme.backgroundImgHeight};
    border-top: solid 1px rgb(0, 0, 0, 0.4);
    border-bottom: solid 1px rgb(0, 0, 0, 0.4);
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

  .backText {
    font-size: ${(props) => props.theme.fontWritePageLarge};
    line-height: 1.6;
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
    if (!texts.length) {
      return null;
    }

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
        <img src={`Dummy/bg.png`} alt={`bg`} />
        <div className="backText ani">{texts[idx]}</div>
      </div>
    </Content>
  );
};

export default TextOnImg;
