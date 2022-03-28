import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { curDate } from "../../modules/date";

const Layout = styled.div`
  /* border: solid 1px black; */

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .display-bg {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .display {
    width: 30%;
  }

  .display-day {
    font-size: ${(props) => props.theme.fontWritePageSmall};
    padding-left: 0.5rem;
    width: 100%;
    border: solid 1px #fff;
    border-radius: ${(props) => props.theme.borderRadius} 0 0 ${(props) => props.theme.borderRadius};
  }
  .icon-bg {
    /* border: solid 1px black; */
    padding: 0 0.3rem;
    border-radius: 0 ${(props) => props.theme.borderRadius} ${(props) => props.theme.borderRadius} 0;
    color: SlateGrey;
    background-color: LightGrey;
  }

  .icon-bg:hover {
    color: ${(props) => props.theme.hoverColor};
  }

  .icon {
    transform: translateY(10%);
  }
`;

function PopupBtn({ className, onClick, setDateDisplayRef }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.readOnly = false;
    inputRef.current.value = curDate();
    inputRef.current.readOnly = true;
    setDateDisplayRef(inputRef);
  }, []);

  return (
    <Layout className={className}>
      <div className="display-bg">
        <div className="display">
          <input ref={inputRef} className="display-day" readOnly name="date"></input>
        </div>
        <div className="icon-bg" onClick={onClick}>
          <FontAwesomeIcon className="icon" icon={faCalendarDays} />
        </div>
      </div>
    </Layout>
  );
}

export default PopupBtn;
