import React, { useEffect, useRef } from "react";
import drawChart from "./drawChart";
import styled from "styled-components";

const Cover = styled.div`
  .container {
    display: flex;
    border-top: 1px solid black;
  }
  .graph {
    margin: 5px auto;
  }
`;

const DonutChart = ({ WaterData, FertilizeData, RepotData }) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const watercolors = ["#05BBD2", "#2070C4"];
  const fertilizeColors = ["#F7C678", "#F3A62B"];
  const repotColors = ["#9B6646", "#714B33"];

  useEffect(() => {
    if (ref1.current) {
      drawChart(ref1.current, WaterData, watercolors);
      drawChart(ref2.current, FertilizeData, fertilizeColors);
      drawChart(ref3.current, RepotData, repotColors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref1, ref2, ref3]);

  return (
    <Cover>
      <div className="container">
        <div className="graph" ref={ref1} />
        <div className="graph" ref={ref2} />
        <div className="graph" ref={ref3} />
      </div>
    </Cover>
  );
};

export default React.memo(DonutChart);
