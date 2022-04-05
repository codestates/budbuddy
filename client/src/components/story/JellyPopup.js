import React, { useState, useEffect, useRef } from "react";
import Reply from "./Reply";
import ReplyTextArea from "./ReplyTextArea";
import styled from "styled-components";
import moment from "moment";
import useLoginStore from "../../store/loginStore";

const Layout = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  margin: 0;

  .popup {
    display: flex;
    position: fixed;
    width: 85vw;
    min-height: 50vh;
    max-height: 70vh;
    overflow-y: auto;
    background: snow;
    animation: jelly 0.35s cubic-bezier(0.06, 1.05, 0.61, 0.91);
    z-index: 2;
    top: 8rem;
    /* display: none; */
    border-radius: ${(props) => props.theme.borderRadius};

    @media screen and (min-width: 391px) {
      width: ${(props) => props.theme.webWidth * 0.85 + "px"};
    }
  }

  @keyframes jelly {
    from {
      transform: scale(1, 1);
    }
    30% {
      transform: scale(1.25, 0.75);
    }
    40% {
      transform: scale(0.75, 1.35);
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
const BlackScreen = styled.div`
  /* border: solid 1px blue; */
  position: fixed;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  animation: darken 0.2s ease;
  z-index: 1;
  top: 0;

  @keyframes darken {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.35);
    }
  }

  @media screen and (min-width: 391px) {
    width: ${(props) => props.theme.webWidth + "px"};
  }
`;

const StoryLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  .top {
    width: 100%;
    /* border: solid 1px blue; */
    padding: 0.3rem;
    display: grid;
    grid-template-columns: 15% 65% 20%;
    margin: 0 auto;
    align-items: center;

    .img {
      object-fit: cover;
      width: 55px;
      height: 55px;
      border-radius: 25%;
      border: solid 2px rgba(0, 0, 0, 0.08);
      transition: transform ${(props) => `${props.hoverTransitonSec}s`} ease;
    }

    .name {
      display: flex;
      flex-direction: column;
      margin-left: 1rem;

      .user {
        margin-top: 0.5rem;
      }

      .plant {
        margin-top: 0.5rem;
      }
    }

    .date {
      /* border: solid 1px red; */
      align-self: end;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      margin-bottom: 0.2rem;
      margin-right: 0.2rem;
      > div {
        font-size: ${(props) => props.theme.fontWritePageXSmall};
      }

      .past {
        margin-top: 0.2rem;
        /* align-self: end; */
      }
    }
  }

  .mid {
    margin-top: 0.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background-color: #fff; */
    width: 100%;

    .title {
      display: flex;
      justify-content: center;
      margin: 0;
      font-size: ${(props) => props.theme.fontWritePageMid};
    }

    .photo {
      margin-top: 0.6rem;
      width: 100%;

      display: flex;
      text-align: center;

      > .journal-img {
        width: 100%;
        height: 26vh;
        object-fit: cover;
        border-top: solid 2px rgba(0, 0, 0, 0.05);
        border-bottom: solid 2px rgba(0, 0, 0, 0.05);
      }
    }
    .content {
      margin: 0.7rem 0.5rem;
      /* border: solid 2px rgba(0, 0, 0, 0.2); */
    }
  }
`;

const JellyPopup = ({ setJellyPopup, story }) => {
  const contentRef = useRef(null);
  const [replyArr, setReply] = useState([]);
  const { isLogin } = useLoginStore();

  function close() {
    setJellyPopup(false);
  }

  const date = moment(story.updatedAt).format("MM/DD");
  const pastDays = moment().diff(moment(story.updatedAt), "days") + "일전";

  return (
    <Layout>
      <BlackScreen className="black" onClick={close} />
      <div className="popup" ref={contentRef}>
        <StoryLayout>
          <div className="top">
            <div className="profile">
              <img className="img" src={story.profileImg || "Dummy/empty_user.png"} alt="" />
            </div>
            <div className="name">
              <div className="user">{story.nickname}</div>
              <div className="plant">{story.plantName}</div>
            </div>
            <div className="date">
              <div>{date}</div>
              <div className="past">{pastDays}</div>
            </div>
          </div>
          <div className="mid">
            <div className="title">
              <div>{`제목: ${story.title}`}</div>
            </div>
            <div className="photo">
              <img className="journal-img" src={story.journalImg || "Dummy/empty_bud.jpg"} alt="" />
            </div>
            <div className="content">
              <div className="text">{story.textContent}</div>
            </div>
          </div>
          <div></div>
          {replyArr.map((v, i) => {
            return <Reply key={i} info={v} contentRef={contentRef} />;
          })}
          {isLogin ? <ReplyTextArea contentRef={contentRef} close={close} setReply={setReply} /> : null}
        </StoryLayout>
      </div>
    </Layout>
  );
};

export default JellyPopup;
