import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { validNickName } from "../../modules/validation";

const Layout = styled.div`
  display: flex;
  flex-direction: column;

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
    width: 100vw;
    @media screen and (min-width: 391px) {
      width: ${(props) => props.theme.webWidth};
    }
  }

  .popup {
    border-radius: ${(props) => props.theme.borderRadius};
    width: 85%;
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

  .chNick {
    font-size: 0.9rem;
    padding: 4px;
    white-space: pre;
  }
  > .invalid {
    color: ${(props) => props.theme.textWaringColor};
  }
  > .right {
    color: green;
  }
`;

//closeFn requied이기 때문에 디폴트 값을 안넣음
const AccountDelete = ({ open = true, closeFn, setModalCode }) => {
  const checkNick = useRef(null);
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
    setModalCode("dataHasBeenRemoved");
    ClosePopup();
  }

  function ClosePopup() {
    closeFn(false);
    popRef.current.className = "popup";
  }

  function onFocus(e) {
    const name = e.target.name;
    if (e.target.value !== "") return;
    if (name === "budname") {
      checkNick.current.className = "chNick ch";
      return (checkNick.current.textContent = "계정삭제를 입력해야합니다.");
    }
  }

  function onChange(e) {
    const name = e.target.name;
    if (e.target.value === "") {
      onFocus(e);
      return;
    }
    if (name === "budname") {
      const isValid = e.target.value === "계정삭제";
      console.log(e.target.value);
      if (!isValid) {
        checkNick.current.textContent = "계정삭제를 입력해야합니다.";
        checkNick.current.className = "chNick ch invalid";
      } else {
        checkNick.current.textContent = "완료 버튼을 누르시면 탈퇴됩니다.";
        checkNick.current.className = "chNick ch right";
      }
    }
  }

  function onBlur(e) {
    if (e.target.value !== "") {
      return;
    }

    checkNick.current.textContent = "";
    checkNick.current.className = "chNick ch";
  }

  return (
    <Layout name="plant">
      <div ref={backRef} className="background">
        <div ref={popRef} className={`popup`}>
          <FormLayout onSubmit={resisterBud}>
            <div className="title trans">계정삭제</div>
            <div className="budname trans">
              <FontAwesomeIcon className="icon" icon={faSeedling} />
              <div className="text">Bud Buddy</div>
            </div>
            <div>계정삭제를 원하시면 "계정삭제"를 입력해주세요</div>
            <div ref={checkNick} className="chNick ch"></div>
            <input className="input-bud trans" placeholder="계정삭제" name="budname" onFocus={onFocus} onChange={onChange} onBlur={onBlur} type="text" />
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

export default AccountDelete;
