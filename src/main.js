import "./style.css";
import * as d3 from "d3";
// import { dotFormat } from "./modules/utils";
import { getSalesData } from "./modules/data";
// import { linearScale, thresholdScale } from "./modules/scale";
// import { createAxis, addAxis } from "./components/axis";
// import { addLegend, setDataLegend } from "./components/legend";
// import { addDiv } from "./components/div";

async function main() {
  /**
   * DATASET
   */
  const dataset = await getSalesData();

  console.log(dataset);

  /**
   * SVG INIT
   */
  const width = 960;
  const height = 600;
  const svg = d3.select("svg").attr("width", width).attr("height", height);

  /**
   * Treemap
   */

  const hierarchyRoot = d3
    .hierarchy(dataset)
    .eachBefore((d) => {
      d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
    })
    .sum(sumBySize)
    .sort((a, b) => b.height - a.height || b.value - a.value);

  const treemap = d3.treemap().size([width, height]).paddingInner(1);

  treemap(hierarchyRoot);

  /**
   *  Group of Cell Treemap
   */

  const cell = svg
    .selectAll("g")
    .data(hierarchyRoot.leaves())
    .enter()
    .append("g")
    .attr("class", "group")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

  /**
   * Cell Treemap
   */

  cell
    .append("rect")
    .attr("class", "tile")
    .attr("id", (d) => d.data.id)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("fill", (d) => "#ababab");

  // const tooltip = addDiv(app, "tooltip");
  // tooltip.style("opacity", 0);
  // provinces
  //   .on("mouseover", (e, d) => {
  //     const innerHtml = ``;
  //     tooltip.html(innerHtml);
  //     tooltip.style("opacity", 1);
  //     tooltip.style("left", e.pageX + "px").style("top", e.pageY - 75 + "px");
  //   })
  //   .on("mouseout", (e, d) => {
  //     tooltip.style("opacity", 0);
  //   });
}

function sumBySize(d) {
  return d.value;
}

try {
  main();
} catch (e) {
  console.log(e);
}
