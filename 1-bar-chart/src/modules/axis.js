import * as d3 from "d3";

function appendAxisX(d3Element, scale, color, offsetX = 0, offsetY = 0) {
  const xAxis = d3.axisBottom().scale(scale);
  d3Element
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("stroke", color)
    .attr("transform", `translate(${offsetX}, ${offsetY})`);
}

function appendAxisY(d3Element, scale, color, offsetX = 0, offsetY = 0) {
  const yAxis = d3.axisLeft(scale);
  d3Element
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("stroke", color)
    .attr("transform", `translate(${offsetX}, ${offsetY})`);
}

export { appendAxisX, appendAxisY };
