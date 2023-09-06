function appendDiv(d3Element) {
  return d3Element.append("div").style("opacity", 0);
}

function appendTooltip(d3Element) {
  return {
    text: appendDiv(d3Element).attr("id", "tooltip"),
    overlay: appendDiv(d3Element).attr("id", "overlay"),
  };
}

export { appendTooltip };
