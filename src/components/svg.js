function addSvg(d3Obj, width, height) {
  return d3Obj
    .append("svg")
    .attr("class", "graph")
    .attr("width", width)
    .attr("height", height);
}

export { addSvg };
