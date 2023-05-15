import app from "./app";

const svg = app
  .append("svg")
  .attr("class", "graph")
  .attr("width", "90vw")
  .attr("height", 400)
  .style("background-color", "salmon");

export default svg;
