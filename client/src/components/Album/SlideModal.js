import React, { useRef, useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  position: absolute;
  min-width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: auto;
  display: flex;
  justify-content: center;
  overflow: hidden;

  .imageDiv {
    width: 100%;
    height: 40vh;
    margin: 0 auto;
    position: absolute;
    background-color: white;
    white-space: nowrap;
    font-size: 0;
    transition: all 0.5s;
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
  }
  .arrow-wrap:hover {
    opacity: 1;
  }

  .imageDiv:hover + .arrow-wrap {
    opacity: 1;
  }
`;

const SlideModal = ({ publicJournal }) => {
  const slideRef = useRef(null);
  const [counter, setCounter] = useState(1);

  function LeftSlide() {
    if (counter >= publicJournal.length) return;
    slideRef.current.style.transform += `translateX(-100%)`;
    setCounter((pre) => pre + 1);
  }

  function RightSlide() {
    if (counter <= 1) return;
    slideRef.current.style.transform += `translateX(100%)`;
    setCounter((pre) => pre - 1);
  }

  return (
    <Layout>
      <div ref={slideRef} className="imageDiv">
        {publicJournal.map((el) => {
          console.log(el);
          return <img key={el.journalId} className="image" src={el.journalImg} alt={`bg`} />;
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
