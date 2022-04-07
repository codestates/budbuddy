import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";

const ChartDiv = styled.div`
  grid-area: ChartSvg;
  > .space {
    height: 2vh;
  }
  .none {
    height: 22vh;
    text-align: center;
    line-height: 15vh;
    color: DimGrey;
  }
`;
const ChartSvgDiv = styled.div`
  margin: auto;
  text-align: center;
`;

const ChartSvg = styled.svg``;

const ChartTitle = styled.h2`
  text-align: center;
`;

const Chart = ({ currentUser, ChartValue }) => {
  const [tempvalue, setValue] = useState(ChartValue);

  useEffect(() => {
    // 캔버스 구역 정의
    const width = 300;
    const height = 300;
    const margin = { top: 20, left: 20, bottom: 20, right: 20 };

    const svg = d3.select(".list");
    const chartLine = [];
    for (let i = 0; i <= 60; i++) {
      chartLine.push(i * 5);
    }
    const data = tempvalue;

    // 눈금 만들기
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.day)) //범위값 입력
      .range([margin.left, width - margin.right]); //출력값의 범위[최소,최대]
    // x축 정의

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)]) //입력값의 범위 [최소값, 최대값]
      .nice()
      .range([height - margin.bottom, margin.top]); //[최소값, 최대값]으로 입력하면 그래프가 뒤집혀 출력 따라사 [최대값, 최소값]
    // y축 정의

    const xAxis = (g) => {
      return g
        .attr("transform", `translate(0, ${height})`)
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0)); // x축 눈금 생성
    };

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(
          d3.axisLeft(y).tickValues(chartLine).tickSize(-width), // y축 눈금 생성
        )
        .call((g) => g.select(".domain").remove())
        .attr("class", "grid");

    // 눈금 적용하기
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    //그래프 그리기
    // const line = d3
    //   .line()
    //   .x((d) => x(d.day) + x.bandwidth() / 2) //각 포인트 x좌표
    //   .y((d) => y(d.value)); //각 포인트 y좌표

    // svg
    //   .append("path") //넣어주기
    //   .datum(data)
    //   .attr("fill", "none")
    //   .attr("stroke", "green")
    //   .attr("stroke-width", 3)
    //   .attr("d", line);

    const area = d3
      .area()
      .x((d) => x(d.day) + x.bandwidth() / 2) //각 포인트 x좌표
      .y0(y(0))
      .y1((d) => y(d.value)); //각 포인트 y좌표

    svg
      .append("path") //넣어주기
      .datum(data)
      .attr("fill", "#BFD4AF")
      .attr("stroke", "#8AB06D")
      .attr("stroke-width", 1)
      .attr("d", area)
      .transition()
      .duration(1000);

    // 각점에 텍스트 추가하기
    svg
      .append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d.value)
      .attr("x", (data) => x(data.day) + x.bandwidth() / 2)
      .attr("y", (data) => y(data.value) - 5)
      .attr("fill", "black")
      .attr("font-family", "Tahoma")
      .attr("font-size", "12px")
      .attr("text-anchor", "middle");
  }, [tempvalue]);

  return (
    <ChartDiv>
      <div className="space"></div>
      <ChartTitle>{currentUser} 성장 기록</ChartTitle>
      {ChartValue.length !== 0 ? (
        <ChartSvgDiv>
          <ChartSvg className="list" width="320" height="320"></ChartSvg>
        </ChartSvgDiv>
      ) : (
        <div className="none">스토리를 작성해주세요</div>
      )}

      <div className="space"></div>
    </ChartDiv>
  );
};

export default Chart;
