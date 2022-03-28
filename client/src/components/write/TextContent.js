import React, { useState } from "react";
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
    border: solid 1px black;
  }

  .photo-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .photo {
      margin: 10px 0 0 0;
      width: 90%;
      border-radius: ${(props) => props.theme.borderRadius};
    }
  }
  .file {
    /* width: 40%; */
    border: solid 1px black;
    /* align-self: flex-end; */
  }
`;

function TextContent() {
  const [img, setImg] = useState(null);
  function onFileChange(e) {
    const {
      target: { files },
    } = e;

    const theFile = files[0];
    console.log(theFile);
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImg(result);
      console.log(finishedEvent);
    };

    reader.readAsDataURL(theFile);
  }
  function onFileClear() {
    setImg(null);
  }
  return (
    <Layout>
      <div className="shell">
        <div className="title-wrap">
          <div className="title">글 제목</div>
        </div>
        {img && (
          <div className="photo-wrap">
            <img className="photo" src={img} alt="" />
            <button className="cancle" onClick={onFileClear}>
              등록취소
            </button>
          </div>
        )}
        <input className="file" type="file" accept="image/*" onChange={onFileChange} />
        <div className="content-wrap">
          <div className="content"></div>
        </div>
      </div>
    </Layout>
  );
}

export default TextContent;
