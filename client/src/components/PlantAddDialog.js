import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  .background {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .popup {
    border-radius: ${(props) => props.theme.borderRadius};
    width: ${(props) => props.theme.webWidth};
    padding: 2%;
    background-color: #f5f5f5;
    box-sizing: border-box;
    z-index: 2;
    opacity: 0;
    position: relative;
    transition: all 0.15s ease-in-out;
    top: 10px;
  }

  .popup.active {
    opacity: 1;
    top: 0;
  }

  .popup .title {
    margin: 5px 0px;
  }

  .popup .desc {
    color: #222;
  }

  .popup .trans {
    position: relative;
    top: 10px;
    opacity: 0;
  }
  .popup.active .trans {
    top: 0px;
    opacity: 1;
    transition: all 0.2s ease-in-out;
  }
  .open {
    margin-top: 3rem;
  }
`;

const FormLayout = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  .title {
    font-size: 0.8rem;
    align-self: center;
  }
  .budname {
    font-size: 0.6rem;
    align-self: start;
    display: flex;
    flex-direction: row;

    > .icon {
      font-size: 10px;
      margin-right: 4px;
    }
  }
  .desc-photo {
    font-size: 0.6rem;
    align-self: start;
  }
  .input-bud {
    border: none;
    margin: 3px 0;
    padding-left: 0.5rem;
  }

  .btn-wrapper {
    display: flex;
    justify-content: space-around;
    margin-top: 3px;
  }

  .btn {
    margin: 0;
    border: none;
    outline: none;
    border-radius: ${(props) => props.theme.borderRadius};
    cursor: pointer;
    padding: 1px 3px;
    margin: 0;
  }

  .open:hover {
    color: snow;
    background-color: ${(props) => props.theme.hoverColor};
  }
  .close:hover {
    color: snow;
    background-color: IndianRed;
  }
`;

//closeFn requied이기 때문에 디폴트 값을 안넣음
const PlantAddDialog = ({ open = false, closeFn, apiFn = "" }) => {
  const popRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    if (open) {
      popRef.current.className = "popup active";
      backRef.current.style.backgroundColor = `rgb(0, 0, 0, 0.4)`;
    }
  }, [open]);

  function resisterBud(e) {
    e.preventDefault();
    if (typeof apiFn === "function") {
      console.log(e.target.budname.value);
      apiFn();
    }
    ClosePopup();
  }

  function ClosePopup() {
    closeFn(false);
    popRef.current.className = "popup";
  }

  return (
    <Layout name="plant">
      <div ref={backRef} className="background">
        <div ref={popRef} className={`popup`}>
          <FormLayout onSubmit={resisterBud}>
            <div className="title trans">식물 추가</div>
            <div className="budname trans">
              <FontAwesomeIcon className="icon" icon={faSeedling} />
              <div className="text">Plant name</div>
            </div>
            <input className="input-bud trans" placeholder="식물의 이름을 입력하세요" name="budname" />
            <div className="btn-wrapper trans">
              <button className="open btn trans" type="submit">
                완료
              </button>
              <button className="close btn trans" onClick={ClosePopup} type="button">
                취소
              </button>
            </div>
          </FormLayout>
        </div>
      </div>
    </Layout>
  );
};

export default PlantAddDialog;
