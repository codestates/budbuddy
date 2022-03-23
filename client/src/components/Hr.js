import React from "react";
import styled from "styled-components";

export const HrWrapper = styled.div`
  display: grid;
  place-items: center;

  padding-top: ${(props) => props.padding + "vh"};
  padding-bottom: ${(props) => props.padding + "vh"};

  .hr {
    background-color: snow;
    width: ${(props) => props.width + "%"};
  }
`;

const Hr = ({ padding = 1, width = 100 }) => {
  return (
    <HrWrapper padding={padding} width={width}>
      <hr className="hr" />
    </HrWrapper>
  );
};

export default Hr;
