import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faThermometer, faRepeat } from "@fortawesome/free-solid-svg-icons";

const actionFontTag = (action, key) => {
  const actionFont = {
    water: <FontAwesomeIcon key={key} className="fa-solid" icon={faDroplet} color="skyblue" />,
    fertilize: <FontAwesomeIcon key={key} className="fa-solid" icon={faThermometer} color="#D7DF01" />,
    repot: <FontAwesomeIcon key={key} className="fa-solid" icon={faRepeat} color="brown" />,
  };
  return actionFont[action];
};

const TileContentDiv = styled.div`
  display: flex;
`;

const EmptyDiv = styled.div`
  height: 13.33px;
`;

const CalenderTileDiv = ({ actions }) => {
  if (!actions) {
    return <EmptyDiv></EmptyDiv>;
  }

  return (
    <TileContentDiv>
      {actions.map((action, idx) => {
        return actionFontTag(action, idx);
      })}
    </TileContentDiv>
  );
};

export default CalenderTileDiv;
