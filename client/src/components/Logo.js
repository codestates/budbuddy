import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

export const Layout = styled.div`
  .logo-wrapper {
  }

  .logo-icon {
    font-size: 3vh;
    color: DarkGreen;
    filter: invert(30%) sepia(100%) saturate(1000%) hue-rotate(110deg) brightness(100%) contrast(65%);
    margin-left: 0.8vh;
  }
  .logo-text {
    font-size: 1.5vh;
    margin-left: 0.5vh;
  }
`;

const Logo = () => {
  return (
    <Layout>
      <div className="logo-wrapper">
        <FontAwesomeIcon className="logo-icon" icon={faSeedling} />
        <span className="logo-text">Bud Buddy</span>
      </div>
    </Layout>
  );
};

export default Logo;
