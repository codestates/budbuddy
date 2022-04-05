import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faCircleExclamation, faImage } from "@fortawesome/free-solid-svg-icons";
import ImgUpload from "../common/ImgUpload";
import useAjaxStore from "../../store/ajaxStore";

const Layout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 1;
  /* border: solid 1px red; */

  display: flex;
  justify-content: center;
  .shell {
    /* border: solid 1px blue; */
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup {
    /* border: solid 1px blue; */
    padding: 1rem;
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: ${(props) => props.theme.formColor};
    animation: flipIn 0.7s ease-out;
    display: flex;
    flex-direction: column;
    min-width: 320px;
    max-width: ${(props) => props.theme.webWidth * 0.9 + "px"};
  }

  .top {
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      font-size: 2rem;
      padding: 0.2rem;
    }

    .alert {
      color: Crimson;
    }

    .err {
      color: #ffd700;
    }

    .image {
      color: LightCoral;
    }

    .title {
      text-align: center;
      white-space: pre-wrap;
      font-size: 1.5rem;
      color: rgba(0, 0, 0, 0.7);
    }
  }

  .mid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    white-space: pre;
    .content {
      margin-top: 0.5rem;
      font-size: 1.15rem;
      line-height: 1.2;
    }

    /* .upload {
      display: flex;
      justify-content: center;
    } */
  }

  .bottom {
    margin-top: 0.8rem;
    display: flex;
    justify-content: space-evenly;

    > button {
      font-size: 1.1rem;
      border: none;
      padding: 0.1rem 0.3rem;
      background: lightgray;
      border-radius: ${(props) => props.theme.borderRadius};
      transition: background-color 0.2s ease;
    }
    .confirm:hover {
      background-color: ${(props) => props.theme.hoverColor};
    }
    .cancle:hover {
      background-color: ${(props) => props.theme.hoverCancleColor};
    }
  }
  @keyframes flipIn {
    0% {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      transition-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      transition-timing-function: ease-in;
    }

    60% {
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }

    80% {
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }

    100% {
      transform: perspective(400px);
    }
  }
`;

const ModalByMode = ({ info = "" }) => {
  const { changePlantImg, getPlantsList } = useAjaxStore();
  function makeModal(info = "") {
    function close() {
      if (typeof info.closePopup === "function") {
        info.closePopup({});
      }
    }
    function deleteBud() {
      if (typeof info.deleteBud === "function") {
        info.deleteBud();
      }
      info.closePopup({});
    }

    const tasks = {
      deleteBud() {
        return (
          <div className="wrap">
            <div className="top">
              <FontAwesomeIcon className="alert icon" icon={faTriangleExclamation} />
              <div className="title">경고</div>
            </div>
            <div className="mid">
              <div className="content">
                <div>{info.text}</div>
              </div>
            </div>
            <div className="bottom">
              <button className="confirm" onClick={deleteBud}>
                확인
              </button>
              <button className="cancle" onClick={close}>
                취소
              </button>
            </div>
          </div>
        );
      },
      testLogin() {
        return (
          <div className="wrap">
            <div className="top">
              <FontAwesomeIcon className="err icon" icon={faCircleExclamation} />
              <div className="title">안내</div>
            </div>
            <div className="mid">
              <div className="content">
                <div>{info.text}</div>
              </div>
            </div>
            <div className="bottom">
              <button className="confirm" onClick={info.done}>
                확인
              </button>
            </div>
          </div>
        );
      },
      reqfillLoginform() {
        return (
          <div className="wrap">
            <div className="top">
              <FontAwesomeIcon className="err icon" icon={faCircleExclamation} />
              <div className="title">안내</div>
            </div>
            <div className="mid">
              <div className="content">
                <div>{info.text}</div>
              </div>
            </div>
            <div className="bottom">
              <button className="confirm" onClick={close}>
                확인
              </button>
            </div>
          </div>
        );
      },
      NotFound() {
        return (
          <div className="wrap">
            <div className="top">
              <FontAwesomeIcon className="err icon" icon={faCircleExclamation} />
              <div className="title">안내</div>
            </div>
            <div className="mid">
              <div className="content">
                <div>{info.text}</div>
              </div>
            </div>
            <div className="bottom">
              <button className="confirm" onClick={close}>
                확인
              </button>
            </div>
          </div>
        );
      },
      wrongPassword() {
        return (
          <div className="wrap">
            <div className="top">
              <FontAwesomeIcon className="err icon" icon={faCircleExclamation} />
              <div className="title">안내</div>
            </div>
            <div className="mid">
              <div className="content">
                <div>{info.text}</div>
              </div>
            </div>
            <div className="bottom">
              <button className="confirm" onClick={close}>
                확인
              </button>
            </div>
          </div>
        );
      },
      alreadyExistsBudName() {
        return (
          <div className="wrap">
            <div className="top">
              <FontAwesomeIcon className="err icon" icon={faCircleExclamation} />
              <div className="title">알림</div>
            </div>
            <div className="mid">
              <div className="content">
                <div>{info.text}</div>
              </div>
            </div>
            <div className="bottom">
              <button className="confirm" onClick={close}>
                확인
              </button>
            </div>
          </div>
        );
      },
      changeBudImage() {
        async function uploadBudImg(e) {
          info.closePopup({});
          await changePlantImg(info.plant_id, info.budName, e.target.upload_img);
          await getPlantsList();
        }

        return (
          <form className="wrap" onSubmit={uploadBudImg}>
            <div className="top">
              <FontAwesomeIcon className="image icon" icon={faImage} />
              <div className="title">사진 교체</div>
            </div>
            <div className="mid">
              <div className="content">
                <div>{info.text}</div>
              </div>
              <div className="upload">
                <ImgUpload />
              </div>
            </div>
            <div className="bottom">
              <button className="confirm" type="submit">
                확인
              </button>
            </div>
          </form>
        );
      },
    };

    if (!tasks[info.fn]) {
      return null;
    }
    return tasks[info.fn]();
  }
  return (
    <Layout>
      <div className="shell" onClick={info.outerFn}>
        <div className="popup">{makeModal(info)}</div>
      </div>
    </Layout>
  );
};
export default ModalByMode;
