import React from "react";
import styled from "styled-components";

export const HrWrapper = styled.div`
  display: grid;
  place-items: center;

  padding-top: ${(props) => props.t + "vh"};
  padding-bottom: ${(props) => props.b + "vh"};

  .hr {
    background-color: snow;
    width: ${(props) => props.width + "%"};
  }
`;

const Hr = ({ className = "", t = 1, b = 1, width = 100 }) => {
  return (
    <HrWrapper className={className} t={t} b={b} width={width}>
      <hr className="hr" />
    </HrWrapper>
  );
};

export default Hr;
