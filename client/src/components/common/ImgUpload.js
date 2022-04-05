import React, { useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  .photo-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .photo {
      margin: 10px 0 5px 0;
      object-fit: cover;
      width: 100%;
      max-height: 25vh;
      border-radius: ${(props) => props.theme.borderRadius};

      > .notice {
        color: DimGrey;
      }
    }
  }

  .file,
  .cancle {
    align-self: start;
    font-size: ${(props) => props.theme.fontWritePageMid};
    border: none;
    background-color: ${(props) => props.theme.btnBgColor};
    color: ${(props) => props.theme.DarkSlateGrey};
    border-radius: ${(props) => props.theme.borderRadius};
    transition: background-color 0.2s ease;
    padding: 0.2rem;
  }

  .cancle {
    margin-left: 1rem;
  }

  .file:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }

  .cancle:hover {
    background-color: ${(props) => props.theme.hoverCancleColor};
  }

  .file-wrap {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 0.5rem;
  }
`;

const ImgUpload = ({ className = "" }) => {
  const [img, setImg] = useState(null);

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

  return (
    <Layout className={className}>
      <div className="photo-wrap">
        {!img ? (
          <div className="photo">
            <div className="notice">등록된 사진이 없습니다</div>
          </div>
        ) : (
          <img className="photo" src={img} alt="" />
        )}
      </div>
      <div className="file-wrap">
        <label className="file" htmlFor="input-file">
          사진 업로드
        </label>
        <input id="input-file" type="file" accept="image/*" onChange={onFileChange} style={{ display: "none" }} name="upload_img" />
        {img ? (
          <button className="cancle" onClick={onFileClear} type="button">
            등록취소
          </button>
        ) : null}
      </div>
    </Layout>
  );
};
export default ImgUpload;
