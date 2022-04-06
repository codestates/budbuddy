import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  position: absolute;
  min-width: 100%;
  height: 100vh;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: auto;
  display: flex;
  justify-content: center;
  overflow: hidden;

  .black {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  .imageDiv {
    width: 100%;
    height: 40vh;
    margin: 0 auto;
    position: absolute;
    background-color: white;
    white-space: nowrap;
    font-size: 0;
    transition: all 0.5s;
    z-index: 2;
    translate: 100%;

    .image {
      position: relative;
      object-fit: cover;
      width: 100%;
      height: 100%;
      border: none;
    }
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
  .arrow-wrap {
    transition: opacity 0.4s ease;
    opacity: 0;
    z-index: 3;
  }
  .arrow-wrap:hover {
    opacity: 1;
  }

  .imageDiv:hover + .arrow-wrap {
    opacity: 1;
  }
  &.close {
    display: none;
  }
`;

const SlideModal = ({ FillteredValue, SlideState, setSlideState, PictureNumber, setPictureNumber }) => {
  const slideRef = useRef(null);
  const [counter, setCounter] = useState(1);
  const Value = FillteredValue.filter((el) => {
    if (el.Journal_Images.length > 0) {
      return el;
    }
  });
  function LeftSlide() {
    if (counter >= Value.length) return;
    slideRef.current.style.transform += `translateX(-100%)`;
    setCounter((pre) => pre + 1);
  }

  function RightSlide() {
    if (counter <= 1) return;
    slideRef.current.style.transform += `translateX(100%)`;
    setCounter((pre) => pre - 1);
  }

  function CloseSlide() {
    slideRef.current.style.transform += `translateX(${100 * (counter - 1)}%)`;
    setCounter(1);
    setPictureNumber(0);
    setSlideState("close");
    slideRef.current.style.transform = "0%";
  }

  useEffect(() => {
    slideRef.current.style.transform += `translateX(-${100 * PictureNumber}%)`;
    setCounter((current) => current + PictureNumber);
  }, [SlideState]);

  return (
    <Layout className={SlideState}>
      <div className="black" onClick={CloseSlide}></div>
      <div ref={slideRef} className="imageDiv">
        {Value.map((el, idx) => {
          return el.Journal_Images.map((JlImg) => {
            return <img key={idx} className="image" src={JlImg.Image.store_path} alt={`bg`} />;
          });
        })}
      </div>
      <div className="arrow-wrap">
        <span className="left arrow" onClick={RightSlide}>
          <img src={"./slideArrow/left-arrow.png"} alt="" />
        </span>
        <span className="right arrow" onClick={LeftSlide}>
          <img src={"./slideArrow/right-arrow.png"} alt="" />
        </span>
      </div>
    </Layout>
  );
};

export default SlideModal;
