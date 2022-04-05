import React from "react";
import styled from "styled-components";
import { useNavigateSearch } from "../../modules/hooks";

export const Layout = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto;
  flex-direction: column;
  width: 100%;

  .shell {
    text-align: start;
    padding: 5px;
    overflow: hidden;
    position: relative;
  }

  .shell:hover {
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 7px 4px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }

  .coverImg {
    object-fit: cover;
    width: 100%;
    height: 13vh;
    mix-blend-mode: darken;

    border: solid 2px rgb(0, 0, 0, 0.65);
  }

  .hide {
    width: 100%;
    height: 100%;
    color: WhiteSmoke;
    z-index: 2;

    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    visibility: hidden;

    transition: opacity 0.25s cubic-bezier(0.55, 1.17, 0.75, 0.53);
    opacity: 0;
  }

  .shell:hover > .hide {
    display: block;
    visibility: visible;
    opacity: 1;
    font-size: 1rem;
  }

  .hide > .text {
    position: relative;
    margin: auto;
    top: 5%;
    /* letter-spacing: 0.6vw; */
    width: 90%;
    height: 90%;
    word-break: keep-all;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    transition: background-color 0.1s cubic-bezier(0.55, 1.17, 0.75, 0.53);
  }

  .hide > .text:hover {
    font-size: 1rem;
    border-radius: ${(props) => props.theme.borderRadius};
  }

  .date {
    font-size: 0.6rem;
  }
`;

const Picture = ({ className, src, date, text, setSlideState, setPictureNumber, idx }) => {
  const openSlide = () => {
    setPictureNumber(idx);
    setSlideState("open");
  };

  return (
    <Layout className={className}>
      <div className="shell">
        <div className="hide">
          <div className="text" onClick={openSlide}>
            {text}
          </div>
        </div>
        <img className="coverImg" src={src} alt={`bg`} />
        <span className="date">{date}</span>
      </div>
    </Layout>
  );
};

export default Picture;
