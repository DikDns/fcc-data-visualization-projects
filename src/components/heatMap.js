function setHeatMap(xScale, yScale, legendThreshold) {
  this.attr("x", (d) => xScale(d.year))
    .attr("y", (d) => yScale(d.month))
    .attr("width", (d) => xScale.bandwidth(d.year))
    .attr("height", (d) => yScale.bandwidth(d.month))
    .attr("fill", (d) => legendThreshold(d.temperature));
}

export function addHeatMap(d3Obj, dataset, scaleMargin) {
  const heatMap = d3Obj
    .append("g")
    .classed("map", true)
    .attr(
      "transform",
      "translate(" + scaleMargin.x + "," + scaleMargin.top + ")"
    )
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect");
  heatMap.set = setHeatMap;
  return heatMap;
}

function setAttrCircle(circle, ...attrArr) {
  attrArr.forEach((attr) => {
    circle.attr(attr[0], attr[1]);
  });
  return attrArr;
}
