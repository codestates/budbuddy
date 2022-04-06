import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

export const Layout = styled.div`
  .logo-wrapper {
  }

  .logo-icon {
    font-size: ${(props) => props.theme.fontWritePageSmall};
    color: DarkGreen;
    filter: invert(30%) sepia(100%) saturate(1000%) hue-rotate(110deg) brightness(100%) contrast(65%);
    margin-left: 0.8vw;
  }
  .logo-text {
    font-size: ${(props) => props.theme.fontWritePageXSmall};
    margin-left: 0.5vw;
  }
`;

const Logo = ({ className = "" }) => {
  return (
    <Layout>
      <div className={`logo-wrapper ${className}`}>
        <FontAwesomeIcon className="logo-icon" icon={faSeedling} />
        <span className="logo-text">Bud Buddy</span>
      </div>
    </Layout>
  );
};

export default Logo;
