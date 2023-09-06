function appendBar(d3Element, dataset) {
  return d3Element.selectAll("rect").data(dataset).enter().append("rect");
}

function setBarProps(
  bar,
  width,
  height,
  color = "black",
  xScale,
  yScale,
  offsetX = 0,
  offsetY = 0
) {
  bar
    .attr("width", width)
    .attr("height", (d, i) => height - yScale(d.gdp))
    .attr("index", (d, i) => i)
    .attr("x", (d, i) => xScale(d.year) + offsetX)
    .attr("y", (d, i) => yScale(d.gdp) + offsetY)
    .attr("fill", color);
}

export { appendBar, setBarProps };
