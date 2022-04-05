import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Layout = styled.div`
  width: 100%;
  /* border: solid 1px BLACK; */
  position: absolute;
  margin: 0;

  .shell {
    position: absolute;
    /* border: solid 1px red; */
    width: 100%;
    margin: 0;
  }

  .wrap {
    position: relative;

    /* border: solid 1px yellow; */
    width: ${(props) => {
      return props.width + "%";
    }};
    display: flex;

    top: ${(props) => props.top + "px"};
    left: ${(props) => {
      let std = Math.abs(props.left - props.width);
      if (props.left > std) {
        return `${std}%`;
      } else {
        return props.left + "%";
      }
    }};
  }

  .btn {
    border: none;
    border-radius: ${(props) => props.theme.borderRadius};
    padding: 0.3rem;
    font-size: ${(props) => props.theme.fontWritePageSmall};
    transition: background-color 0.25s ease, color 0.25s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn:hover {
    background-color: ${(props) => props.theme.hoverColor};
    color: #fff;
  }
  .icon {
    font-size: ${(props) => props.theme.fontWritePageLarge};
  }
`;

const GoBack = ({ top = 0, left = 0, width = 10 }) => {
  const navigate = useNavigate();
  function onClick(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <Layout top={top} left={left} width={width}>
      <div className="shell">
        <div className="wrap">
          <button type="submit" className="btn" onClick={onClick}>
            <FontAwesomeIcon className="icon" icon={faArrowRightFromBracket} />
          </button>
        </div>
      </div>
    </Layout>
  );
};
export default GoBack;
