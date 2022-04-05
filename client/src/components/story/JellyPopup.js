import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import moment from "moment";
import useAjaxStore from "../../store/AjaxStore";
import useLoginStore from "../../store/LoginStore";

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

  .bottom {
    width: 100%;
    .content-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 10px;
      .content {
        border: solid 1px rgba(0, 0, 0, 0.2);
        padding: 10px;
        width: 95%;
        min-height: 8vh;
        resize: none;
        font-size: ${(props) => props.theme.fontWritePageSmall};
        border-radius: ${(props) => props.theme.borderRadius};
      }
      .content:focus {
        outline: none;
        padding: 10px;
      }
      .content::-webkit-scrollbar {
        width: 0;
      }
    }

    .btn {
      display: flex;
      justify-content: start;
      margin-top: 0.5rem;
      /* border: solid 1px black; */

      > button {
        border-radius: ${(props) => props.theme.borderRadius};
        font-size: ${(props) => props.theme.fontWritePageMid};
        border: none;
        margin: 0 0.5rem 1rem 0.5rem;
        padding: 0.1rem 0.3rem;
        transition: background-color 0.2s ease;
      }
      .done:hover {
        background-color: ${(props) => props.theme.hoverColor};
      }
      .cancle:hover {
        background-color: ${(props) => props.theme.hoverCancleColor};
      }
    }
  }

  .reply {
    display: flex;
    flex-direction: column;
    padding: 0.1rem 0.3rem;
    background-color: ${(props) => props.theme.replyBgColor};
    padding: 0.7rem 0 0.7rem 0;
    border-bottom: solid 1px rgba(105, 105, 105, 0.3);
    .reply-top {
      display: flex;
      justify-content: space-between;
      padding: 0 0.5rem 0 0.5rem;

      .top-l {
        font-size: 1.1rem;
        color: DarkSlateGrey;
      }

      .top-r {
        .reply-delete {
          cursor: pointer;
          border-radius: ${(props) => props.theme.borderRadius};
          transition: background-color 0.2s ease;
          padding: 0.2rem 0.3rem;
        }

        .reply-delete:hover {
          background-color: ${(props) => props.theme.hoverColor};
        }

        .reply-date {
          font-size: 0.8rem;
          margin-left: 0.5rem;
        }
      }
    }

    .reply-mid {
      margin-top: 0.6rem;
      padding: 0 0.5rem 0 0.5rem;
      white-space: pre-wrap;

      .reply-content {
        white-space: pre-wrap;
        line-height: 1.3;
        .rereply {
          transition: color 0.2s ease;
        }
        .rereply:hover {
          color: ${(props) => props.theme.hoverColor};
        }
      }
    }
  }
`;

function Reply({ info }) {
  const replyTime = moment().format("MM/DD ").replaceAll("0", "") + moment().format("h:mm");

  function removeReply() {
    console.log("리플 삭제 란");
  }

  function addRereply() {
    console.log("대댓글 작성란");
  }

  return (
    <div className="reply">
      <div className="reply-top">
        <div className="top-l">{info.nickname}</div>
        <div className="top-r">
          <span className="reply-delete" onClick={removeReply}>
            삭제
          </span>
          <span className="reply-date">{replyTime}</span>
        </div>
      </div>
      <div className="reply-mid">
        <div className="reply-content">
          {info.replyContent}&nbsp;&nbsp;
          <span className="rereply" onClick={addRereply}>
            reply
          </span>
        </div>
      </div>
    </div>
  );
}

function ReplyWrite({ contentRef, close, replyArr, setReply, userInfo }) {
  const textRef = useRef(null);

  function textAreaResize(e) {
    e.target.style.height = "auto";
    e.target.style.minHeight = "15vh";
    let scHeight = e.target.scrollHeight;
    e.target.style.height = `${scHeight}px`;
    contentRef.current.scrollTo(0, contentRef.current.scrollHeight);
  }

  function addReply() {
    if (textRef.current.value === "") return;
    userInfo.replyContent = textRef.current.value + "";
    const newObj = JSON.parse(JSON.stringify(userInfo));
    setReply((pre) => {
      return pre.concat(newObj);
    });
    textRef.current.value = "";
  }

  return (
    <div className="bottom">
      <div>
        <div className="content-wrap">
          <textarea ref={textRef} className="content" placeholder="댓글 입력" onKeyUp={textAreaResize} name="content" />
        </div>
        <div className="btn">
          <button className="done" onClick={addReply}>
            등록
          </button>
          <button className="cancle" onClick={close}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

const JellyPopup = ({ setJellyPopup, story }) => {
  const contentRef = useRef(null);
  const [replyArr, setReply] = useState([]);
  const { isLogin } = useLoginStore();
  const { userInfo } = useAjaxStore();

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
            return <Reply key={i} info={v} />;
          })}
          {isLogin ? <ReplyWrite contentRef={contentRef} close={close} replyArr={replyArr} setReply={setReply} userInfo={userInfo} /> : null}
        </StoryLayout>
      </div>
    </Layout>
  );
};

export default JellyPopup;
