import React, { useRef, useState } from "react";
import styled from "styled-components";

export const Layout = styled.div`
  img {
    object-fit: cover;
    width: 100%;
    height: 30vh;
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
      <div className="section">
        <div className="slidewrap">
          <ul ref={slideRef} className="slidelist">
            {images.map((src, i) => {
              return (
                <li key={i}>
                  <div>
                    <img src={src} alt={`bg`} />
                  </div>
                </li>
              );
            })}
          </ul>
          <span className="left arrow" onClick={LeftSlide}>
            <img src={"./slideArrow/left-arrow.png"} alt="" />
          </span>
          <span className="right arrow" onClick={RightSlide}>
            <img src={"./slideArrow/right-arrow.png"} alt="" />
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default ImgSlide;
