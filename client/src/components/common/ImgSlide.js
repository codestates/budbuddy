import React, { useRef, useState } from "react";
import styled from "styled-components";
import Loading from "../common/Loading";

const Layout = styled.div`
  img {
    object-fit: cover;
    width: 100%;
    height: ${(props) => props.theme.backgroundImgHeight};
    border: none;
  }

  .section .slidewrap {
    max-width: 100vw;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  .section .slidelist {
    white-space: nowrap;
    font-size: 0;
    transition: all 0.5s;
  }
  .section .slidelist > li {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
  }
  .section .slidelist > li > div {
    display: block;
    position: relative;
  }

  .arrow > img {
    object-fit: cover;
    width: 25px;
    height: 30px;
    border: none;
  }

  .arrow {
    padding: 10px;
    cursor: pointer;
  }

  .left {
    position: absolute;
    top: 50%;
    left: 2%;

    transform: translate(-10%, -50%);
  }

  .right {
    position: absolute;
    top: 50%;
    right: 2%;

    transform: translate(10%, -50%);
  }

  .title {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-top: solid 1px rgba(0, 0, 0, 0.1);
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    white-space: pre;

    display: flex;
    justify-content: center;
    align-items: center;

    .topic {
      font-family: "Jua", sans-serif;
      text-align: center;
      font-size: ${(props) => props.theme.fontWritePageMid};
      line-height: 1.5;
      /* border: solid 1px green; */
      color: rgba(0, 0, 0, 0.8);
      filter: contrast(200%) drop-shadow(16px 16px 20px DimGrey);
    }

    .name {
      font-family: "Jua", sans-serif;
      font-size: ${(props) => props.theme.fontWritePageLarge};
      color: DarkSlateGrey;
    }
  }

  .slidelist + .arrow-wrap {
    transition: opacity 0.4s ease;
    opacity: 0;
  }
  .slidelist + .arrow-wrap:hover {
    opacity: 1;
  }

  .slidelist:hover + .arrow-wrap {
    opacity: 1;
  }
`;

const ImgSlide = ({ className = "", images }) => {
  const slideRef = useRef(null);
  const [counter, setCounter] = useState(1);

  function LeftSlide() {
    if (counter >= images.length) return;
    slideRef.current.style.transform += `translateX(-100%)`;
    setCounter((pre) => pre + 1);
  }

  function RightSlide() {
    if (counter <= 1) return;
    slideRef.current.style.transform += `translateX(100%)`;
    setCounter((pre) => pre - 1);
  }
  return (
    <Layout className={className}>
      {images.length === 0 ? (
        <Loading isAb={false} top={0} left={0} bgColor={"lightgray"} />
      ) : (
        <div className="section">
          <div className="slidewrap">
            <ul ref={slideRef} className="slidelist">
              {images.map((v, i) => {
                return (
                  <li key={i}>
                    <div>
                      <img src={v.src} alt={`bg`} />
                      <div className="title">
                        <div className="topic">
                          {v.title}
                          <span className="name">&nbsp;{v.name}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="arrow-wrap">
              <span className="left arrow" onClick={RightSlide}>
                <img src={"./slideArrow/left-arrow.png"} alt="" />
              </span>
              <span className="right arrow" onClick={LeftSlide}>
                <img src={"./slideArrow/right-arrow.png"} alt="" />
              </span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ImgSlide;
