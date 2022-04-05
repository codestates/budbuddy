import React, { useRef } from "react";
import styled from "styled-components";
import moment from "moment";
import useAjaxStore from "../../store/AjaxStore";

const Layout = styled.div`
  width: 100%;
  .content-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;

    .content {
      border: solid 1px rgba(0, 0, 0, 0.1);

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
      border: none;
      margin: 0 0.5rem 1rem 0.5rem;
      padding: 0.1rem 0.3rem;
      transition: background-color 0.2s ease;
      font-size: ${(props) => (props.isRereply ? (props) => props.theme.fontWritePageXSmall : (props) => props.theme.fontWritePageMid)};
    }
    .done:hover {
      background-color: ${(props) => props.theme.hoverColor};
    }
    .cancle:hover {
      background-color: ${(props) => props.theme.hoverCancleColor};
    }
  }
`;

function ReplyTextArea({ contentRef, close, setReply, isRereply = false }) {
  const textRef = useRef(null);
  const { userInfo } = useAjaxStore();

  function textAreaResize(e) {
    e.target.style.height = "auto";
    e.target.style.minHeight = isRereply ? "auto" : "15vh";
    let scHeight = e.target.scrollHeight;
    e.target.style.height = `${scHeight}px`;
    if (!isRereply) contentRef.current.scrollTo(0, contentRef.current.scrollHeight);
  }

  function addReply() {
    if (textRef.current.value === "") return;
    userInfo.replyContent = textRef.current.value + "";
    userInfo.replyTime = moment().format("MM/DD ").replaceAll("0", "") + moment().format("h:mm");
    const newObj = JSON.parse(JSON.stringify(userInfo));
    setReply((pre) => {
      return pre.concat(newObj);
    });
    textRef.current.value = "";
    if (isRereply) close();

    const { style } = textRef.current;
    contentRef.current.scrollTo(0, contentRef.current.scrollHeight);
    console.log("style:::", style, contentRef.current.scrollHeight);
  }

  return (
    <Layout className="bottom" isRereply={isRereply}>
      <div>
        <div className="content-wrap">
          <textarea ref={textRef} className="content" placeholder="댓글 입력" onKeyUp={textAreaResize} name="content" autoFocus />
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
    </Layout>
  );
}

export default ReplyTextArea;
