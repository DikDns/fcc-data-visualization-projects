const LEGEND_OFFSET = 25;
const LEGEND_RECT_SIZE = 15;
const LEGEND_H_SPACING = 150;
const LEGEND_V_SPACING = 10;
const LEGEND_TEXT_X_OFFSET = 3;
const LEGEND_TEXT_Y_OFFSET = -2;

export function appendLegend(d3Obj, dataset, width, color) {
  const legendElemsPerRow = Math.floor(width / LEGEND_H_SPACING);
  const legend = d3Obj
    .append("g")
    .attr("transform", "translate(60," + LEGEND_OFFSET + ")")
    .selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr(
      "transform",
      (d, i) =>
        "translate(" +
        (i % legendElemsPerRow) * LEGEND_H_SPACING +
        "," +
        (Math.floor(i / legendElemsPerRow) * LEGEND_RECT_SIZE +
          LEGEND_V_SPACING * Math.floor(i / legendElemsPerRow)) +
        ")"
    );

  legend
    .append("rect")
    .attr("width", LEGEND_RECT_SIZE)
    .attr("height", LEGEND_RECT_SIZE)
    .attr("class", "legend-item")
    .attr("fill", (d) => color(d));

  legend
    .append("text")
    .attr("x", LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET)
    .attr("y", LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET)
    .text((d) => d);

  return legend;
}
