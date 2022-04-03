import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const Layout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 1;
  /* border: solid 1px red; */

  .shell {
    /* border: solid 1px blue; */
    width: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup {
    /* border: solid 1px blue; */
    max-width: 85%;
    padding: 1rem;
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: ${(props) => props.theme.formColor};
    animation: flipIn 0.7s ease-out;
    display: flex;
    flex-direction: column;
  }

  .text {
    width: 100%;
    text-align: center;
    white-space: pre-wrap;
    line-height: 1.3;
    font-size: 1.1rem;
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
//
const TopCap = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
  .wrap {
    display: flex;

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
    .alert-text {
      font-size: 1.7rem;
      padding: 0.2rem;
    }
  }
`;

const BottomCap = styled.div`
  margin: 0.5rem;

  .btn-wrap {
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
`;

function makeTop(type = "", fn = "") {
  const tasks = {
    alert() {
      return (
        <TopCap>
          <div className="wrap">
            <FontAwesomeIcon className="alert icon" icon={faTriangleExclamation} />
            <div className="alert-text">경고</div>
          </div>
        </TopCap>
      );
    },
    error() {
      return (
        <TopCap>
          <div className="wrap">
            <FontAwesomeIcon className="err icon" icon={faCircleExclamation} />
            <div className="alert-text">주의</div>
          </div>
        </TopCap>
      );
    },
  };

  if (!tasks[type]) {
    return null;
  }
  return tasks[type]();
}

function makeBottom(type = "alert", confirmFn = "", setPopup = "") {
  const tasks = {
    alert() {
      function close() {
        if (typeof setPopup === "function") {
          setPopup(false);
        }
      }

      function confirm() {
        if (typeof confirmFn === "function") {
          confirmFn();
        }
        setPopup(false);
      }

      return (
        <BottomCap>
          <div className="btn-wrap">
            <button className="confirm" onClick={confirm}>
              확인
            </button>
            <button className="cancle" onClick={close}>
              취소
            </button>
          </div>
        </BottomCap>
      );
    },
    error() {
      function confirm() {
        setPopup(false);
      }

      return (
        <BottomCap>
          <div className="btn-wrap">
            <button className="confirm" onClick={confirm}>
              확인
            </button>
          </div>
        </BottomCap>
      );
    },
  };

  if (!tasks[type]) {
    return null;
  }
  return tasks[type]();
}

const ModalByMode = ({ type = "alert", text = "", confirmFn = "", setPopup = "" }) => {
  return (
    <Layout>
      <div className="shell">
        <div className="popup">
          {makeTop(type)}
          <div className="text">
            <div>{text}</div>
          </div>
          {makeBottom(type, confirmFn, setPopup)}
        </div>
      </div>
    </Layout>
  );
};
export default ModalByMode;
