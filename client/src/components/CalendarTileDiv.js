import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faThermometer, faRepeat } from "@fortawesome/free-solid-svg-icons";

const CalenderTileDiv = ({ actions }) => {
  const TileContentDiv = styled.div`
    display: flex;
  `;

  //   console.log("heloo", 1);
  //   const A = actions.map((el) => {
  //     if (el === "water") {
  //       return <FontAwesomeIcon className="fa-solid" icon={faDroplet} color="skyblue" />;
  //     }
  //     if (el === "soil") {
  //       return <FontAwesomeIcon className="fa-solid" icon={faThermometer} color="#D7DF01" />;
  //     }
  //     if (el === "nutrition") {
  //       return <FontAwesomeIcon className="fa-solid" icon={faRepeat} color="brown" />;
  //     }
  //   });
  //   console.log(A);
  //   console.log("Newactions", actions);
  return (
    <TileContentDiv>
      <div>hellow</div>
      {/* {actions.map((el) => {
        // console.log("hellow");
        // console.log("Newactions", actions);
        if (el === "water") {
          return <FontAwesomeIcon className="fa-solid" icon={faDroplet} color="skyblue" />;
        }
        if (el === "soil") {
          return <FontAwesomeIcon className="fa-solid" icon={faThermometer} color="#D7DF01" />;
        }
        if (el === "nutrition") {
          return <FontAwesomeIcon className="fa-solid" icon={faRepeat} color="brown" />;
        }
      })} */}
    </TileContentDiv>
  );
};
// for (let i = 0; i < mark.length; i++) {
//   console.log("date----", date instanceof Date);
//   if (mark[i][0] === moment(date).format("YYYY-MM-DD")) {
//     return (
//       <Cover>
//         {mark[i].indexOf("water") !== -1 ? <FontAwesomeIcon className="fa-solid" icon={faDroplet} color="skyblue" /> : null}
//         {mark[i].indexOf("soil") !== -1 ? <FontAwesomeIcon className="fa-solid" icon={faThermometer} color="#D7DF01" /> : null}
//         {mark[i].indexOf("nutrition") !== -1 ? <FontAwesomeIcon className="fa-solid" icon={faRepeat} color="brown" /> : null}
//       </Cover>
//     );
//   }
// }
export default CalenderTileDiv;
