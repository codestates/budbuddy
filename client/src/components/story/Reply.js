import React, { useState, useRef } from "react";
import ReplyTextArea from "./ReplyTextArea";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReplyd } from "@fortawesome/free-brands-svg-icons";
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.replyBgColor};
  padding: 0.7rem 0 0 0;
  border-top: solid 1px rgba(0, 0, 0, 0.1);

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
    position: relative;
    margin-top: 0.6rem;

    white-space: pre-wrap;

    .reply-content {
      white-space: pre-wrap;
      line-height: 1.3;
      padding: 0 0.5rem 0 0.5rem;
      margin-bottom: 0.5rem;

      .rereply-btn {
        transition: color 0.2s ease;
      }
      .rereply-btn:hover {
        color: ${(props) => props.theme.hoverColor};
      }
    }

    .rereply-frame {
      /* border: solid 1px red; */
      background-color: rgba(234, 234, 234, 0.85);
      padding: 0rem 0.2rem;
      border-bottom: solid 1px rgba(0, 0, 0, 0.1);

      .top {
        display: flex;
        justify-content: space-between;

        .name {
          margin: 0;
          font-size: 1.1rem;

          display: flex;
          flex-direction: row;

          .re-icon {
            margin-right: 0.3rem;
            transform: translateY(10%);
            font-size: 1.1rem;
            color: LightCoral;
          }
        }

        .top-right {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: baseline;
          /* border: solid 1px red; */

          .rereply-delete {
            margin-right: 0.5rem;
            font-size: 1rem;
            padding: 0.1rem 0.2rem;
            border-radius: ${(props) => props.theme.borderRadius};
          }

          .rereply-delete:hover {
            background-color: ${(props) => props.theme.hoverColor};
          }
          .date {
            margin: 0;
            font-size: 0.8rem;
          }
        }
      }

      .mid {
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: start;

        .rereply-content {
          margin-bottom: 0.3rem;
        }
      }
    }
  }
`;

function Reply({ contentRef, info }) {
  const [isOpen, setOpen] = useState(false);
  const [replyArr, setReply] = useState([]);

  function removeReply() {
    console.log("리플 삭제 란");
  }

  function removeRereply() {
    console.log("대댓글 삭제 란");
  }

  function addRereply() {
    setOpen(true);
    console.log("대댓글 작성란");
  }

  function close() {
    setOpen(false);
  }

  console.log("reply info:::", info);
  //&nbsp;&nbsp;
  return (
    <Layout className="reply">
      <div className="reply-top">
        <div className="top-l">{info.nickname}</div>
        <div className="top-r">
          <span className="reply-delete" onClick={removeReply}>
            삭제
          </span>
          <span className="reply-date">{info.replyTime}</span>
        </div>
      </div>
      <div className="reply-mid">
        <div className="reply-content">
          {info.replyContent}&nbsp;&nbsp;
          <span className="rereply-btn" onClick={addRereply}>
            reply
          </span>
        </div>
        <div className="rereply-wrap">
          {replyArr.map((v, i) => {
            console.log("대댓글:", v);
            return (
              <div key={i} className="rereply-frame">
                <div className="top">
                  <div className="name">
                    <span>
                      <FontAwesomeIcon className="re-icon" icon={faReplyd} />
                    </span>
                    {v.nickname}
                  </div>
                  <div className="top-right">
                    <span className="rereply-delete" onClick={removeRereply}>
                      삭제
                    </span>
                    <div className="date">{v.replyTime}</div>
                  </div>
                </div>
                <div className="mid">
                  <div className="rereply-content">&nbsp;&nbsp;{v.replyContent}</div>
                </div>
              </div>
            );
          })}
          {isOpen ? <ReplyTextArea contentRef={contentRef} setReply={setReply} isRereply={true} close={close} /> : null}
        </div>
      </div>
    </Layout>
  );
}

export default Reply;
