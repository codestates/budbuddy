import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: 100%;

  display: flex;

  .shell {
    width: 100%;
    flex-direction: column;
    display: flex;
  }

  .title-wrap {
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
    > .title {
      /* border: solid 1px black; */
      width: 80%;
      background: none;
      border: none;
      text-align: center;

      font-size: ${(props) => props.theme.fontWritePageMid};
    }
    > .title:focus {
      outline: none;
    }

    > .title::placeholder {
      text-align: center;
    }
  }

  .photo-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .photo {
      margin: 10px 0 10px 0;
      object-fit: cover;
      width: 90%;
      height: 30vh;
      border-radius: ${(props) => props.theme.borderRadius};

      display: flex;
      justify-content: center;
      align-items: center;
      > .notice {
        color: DimGrey;
      }
    }
  }

  .btn {
    /* border: solid 1px black; */
    /* width: 40%; */
    /* align-self: flex-end; */
    display: flex;
    justify-content: space-between;
    > .file,
    .cancle {
      border: none;
      padding: 3px;
      border-radius: ${(props) => props.theme.borderRadius};
      font-size: ${(props) => props.theme.fontWritePageSmall};
      background-color: ${(props) => props.theme.btnBgColor};
      transition: background-color 0.2s ease;
    }
  }

  .file {
    margin-left: 20px;
  }
  .cancle {
    margin-right: 20px;
    border: solid 1px black;
  }
  .file:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
  .cancle:hover {
    background-color: ${(props) => props.theme.hoverCancleColor};
  }
  .content-wrap {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .content {
      padding: 10px;
      width: 90%;
      min-height: 15vh;
      border: none;
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
  .semantic {
    display: none;
  }
`;

function TextContent({ className = "", title = "", content = "" }) {
  //
  const [img, setImg] = useState(null);
  useEffect(() => {}, []);

  function onFileChange(e) {
    const {
      target: { files },
    } = e;

    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImg(result);
    };

    reader.readAsDataURL(theFile);
  }
  function onFileClear() {
    setImg(null);
  }
  function textAreaResize(e) {
    e.target.style.height = "auto";
    e.target.style.minHeight = "15vh";
    let scHeight = e.target.scrollHeight;
    e.target.style.height = `${scHeight}px`;
  }
  function titleAlign(e) {
    e.target.style.textAlign = "center";
    if (e.target.value === "") {
      e.target.style.textAlign = "start";
    }
  }

  return (
    <Layout className={className}>
      <button className="semantic" name="photo" value={img} type="button" />
      <div className="shell">
        <div className="title-wrap">
          <input type="text" className="title" placeholder="제목 입력" onBlur={titleAlign} required name="title" defaultValue={title} />
        </div>
        <div className="photo-wrap">
          {!img ? (
            <div className="photo">
              <div className="notice">등록된 사진이 없습니다</div>
            </div>
          ) : (
            <img className="photo" src={img} alt="" />
          )}
        </div>
        <div className="btn">
          <label className="file" htmlFor="input-file">
            사진 업로드
          </label>
          <input id="input-file" type="file" accept="image/*" onChange={onFileChange} style={{ display: "none" }} />
          {img ? (
            <button className="cancle" onClick={onFileClear}>
              등록취소
            </button>
          ) : null}
        </div>
        <div className="content-wrap">
          <textarea className="content" placeholder="내용 입력" onKeyUp={textAreaResize} name="content" defaultValue={content}></textarea>
        </div>
      </div>
    </Layout>
  );
}

export default TextContent;
