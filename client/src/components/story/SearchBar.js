import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Layout = styled.div`
  width: 100%;
  min-height: 99.9vh;
  /* border: solid 1px BLACK; */
  position: absolute;
  margin: 0;

  .shell {
    position: absolute;
    /* border: solid 1px red; */
    width: 100%;
    margin: 0;
  }

  .search-wrap {
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
  .search-bar {
    width: 100%;
    border: none;
    font-size: ${(props) => props.theme.fontWritePageSmall};
    border-radius: ${(props) => props.theme.borderRadius} 0 0 ${(props) => props.theme.borderRadius};
    padding: 0.1rem 0 0.1rem 0.5rem;
  }
  .btn {
    border: none;
    border-radius: 0 ${(props) => props.theme.borderRadius} ${(props) => props.theme.borderRadius} 0;
    padding: 0.3rem 0.2rem 0.1rem 0.3rem;
    font-size: ${(props) => props.theme.fontWritePageSmall};
    transition: background-color 0.25s ease, color 0.25s ease;
  }
  .btn:hover {
    background-color: ${(props) => props.theme.hoverColor};
    color: #fff;
  }

  .search-bar:focus {
    outline: none;
  }
`;

const SearchBar = ({ top = 0, left = 0, width = 10, fn = "" }) => {
  function onClick(e) {
    e.preventDefault();
    if (typeof fn === "function") {
      fn();
    }
  }

  return (
    <Layout top={top} left={left} width={width}>
      <div className="shell">
        <form className="search-wrap">
          <input type="text" placeholder="유저/식물 검색" name="search" className="search-bar" />
          <button type="submit" className="btn" onClick={onClick}>
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default SearchBar;
