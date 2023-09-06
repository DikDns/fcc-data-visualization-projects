function addRect(data, threshold, scale) {
  return this.selectAll("#legend")
    .data(data)
    .enter()
    .append("rect")
    .style("fill", (d) => threshold(d[0]))
    .attr("x", (d) => scale(d[0]))
    .attr("y", 0)
    .attr("width", (d, i) => {
      const fixedWidth = scale(d[1]) - scale(d[0]);
      return d[0] && d[1] ? fixedWidth : scale(null);
    })
    .attr("height", this.height)
    .attr("class", "legend-label");
}

export function addLegend(d3Obj, height) {
  const legend = d3Obj.append("g").attr("id", "legend");
  legend.addRect = addRect;
  legend.height = height;
  return legend;
}

export function setDataLegend(legendThreshold, legendScale) {
  return legendThreshold.range().map((color) => {
    const d = legendThreshold.invertExtent(color);
    // Set the limit of each x axis
    if (d[0] === null) {
      d[0] = legendScale.domain()[0];
    }
    if (d[1] === null) {
      d[1] = legendScale.domain()[1];
    }
    return d;
  });
}
