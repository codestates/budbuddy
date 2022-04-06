import * as d3 from "d3";

const drawChart = (element, data, colors) => {
  // const colors = ["#05BBD2", "#2070C4"];
  const boxSize = 500;
  console.log("data", data);
  const maxValue = data.reduce((acc, cur) => {
    if (acc <= cur.value) {
      acc = cur;
      console.log(cur);
    }
    return acc;
  }, 0).value;
  console.log(maxValue);

  d3.select(element).select("svg").remove(); // Remove the old svg
  // Create new svg
  const svg = d3
    .select(element)
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("height", "100px")
    .attr("width", "100px")
    .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
    .append("g")
    .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);

  const arcGenerator = d3
    .arc()
    .padAngle(0.02)
    .innerRadius(0)
    .outerRadius(200)
    .outerRadius((d) => {
      return 200 - (maxValue - d.value - 10);
    });

  const pieGenerator = d3.pie().value((d) => d.value);

  const arcs = svg.selectAll().data(pieGenerator(data)).enter();
  arcs
    .append("path")
    .attr("d", arcGenerator)
    .style("stroke", "#777")
    .style("stroke-width", 3)
    .style("fill", (d, i) => colors[i % data.length])
    .transition()
    .duration(1000)
    .attrTween("d", function (d) {
      const i = d3.interpolate(d.startAngle, d.endAngle);
      return function (t) {
        d.endAngle = i(t);
        return arcGenerator(d);
      };
    });
};

export default drawChart;
