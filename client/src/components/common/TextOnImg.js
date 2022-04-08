import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { useInterval } from "../../modules/hooks";
import Loading from "../common/Loading";
import { bg } from "../../resources";

const Content = styled.div`
  display: grid;
  position: relative;
  width: 100%;

  .shell {
    display: flex;
    position: relative;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    place-items: center;
    text-align: center;
    position: relative;

    /* border: solid 1px red; */

    #canvas {
      width: 100%;
      height: ${(props) => props.theme.backgroundImgHeight};
      border-top: solid 1px rgb(0, 0, 0, 0.4);
      border-bottom: solid 1px rgb(0, 0, 0, 0.4);
    }

    .backText {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      margin: 0 auto;
      transform: translate(-50%, -50%);
      white-space: pre-wrap;

      /* border: solid 1px red; */

      font-weight: ${(props) => props.theme.fontWeightBg};
      color: ${(props) => props.theme.backgroundTextColor};

      font-family: "Jua", sans-serif;
      font-size: ${(props) => props.theme.fontWritePageMid};
      line-height: 1.6;
      color: WhiteSmoke;
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

const Canvas = styled.canvas`
  /* border: 1px solid red; */
  position: relative;
  width: 100%;
  height: ${(props) => props.theme.backgroundImgHeight};
`;

const TextOnImg = ({ className = "", texts = [], time = 5000 }) => {
  const [idx, setIdx] = useState(0);
  const [ctx, setCtx] = useState(null);
  const canvasRef = useRef(document.getElementById("canvas"));

  useEffect(() => {
    if (!canvasRef.current) return;
    setCtx(canvasRef.current.getContext("2d"));
  }, [canvasRef]);

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

  const index = parseInt(Math.random() * bg.length);

  const render = useCallback(() => {
    if (!ctx) return;
    const bgImg = new Image();
    bgImg.src = bg[index];

    bgImg.onload = function () {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, 0, 0, canvasRef.current.width, canvasRef.current.height);
    };
  }, [ctx, index]);

  useEffect(() => {
    render();
  }, [ctx, render]);

  return (
    <Content className={className} textTime={time}>
      <div className="shell">
        {texts.length === 0 ? (
          <Loading isAb={false} top={0} left={0} bgColor={"lightgray"} />
        ) : (
          <div className="wrap">
            <Canvas ref={canvasRef} id="canvas" />
            {/* <img src={bg[index] || ""} alt={`bg`} /> */}
            <div className="backText ani">{texts[idx] || ""}</div>
          </div>
        )}
      </div>
    </Content>
  );
};

export default TextOnImg;
