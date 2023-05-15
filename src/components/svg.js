function appendSvg(d3Element, width, height, offsetX = 100, offsetY = 60) {
  return d3Element
    .append("svg")
    .attr("width", width + offsetX)
    .attr("height", height + offsetY);
}

function appendTextY(d3Element, text, x = -250, y = 80) {
  d3Element
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", x)
    .attr("y", y)
    .text(text);
}

export { appendSvg, appendTextY };
