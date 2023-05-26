import "./style.css";
import * as d3 from "d3";
import { getSalesData, colorScheme20 } from "./modules/data";
import { ordinalScale } from "./modules/scale";
import { createTreemap, appendTreemap } from "./components/treemap";
import { addDiv } from "./components/div";
// import { addLegend, setDataLegend } from "./components/legend";

async function main() {
  const app = d3.select("#app");

  /**
   * DATASET
   */
  const dataset = await getSalesData();

  /**
   * Color
   */
  const color = ordinalScale(colorScheme20);

  /**
   * SVG INIT
   */
  const width = 960;
  const height = 600;
  const treemap = d3
    .select("#tree-map")
    .attr("width", width)
    .attr("height", height);

  /**
   * Treemap
   */
  const treemapData = createTreemap(dataset, width, height);
  const cell = appendTreemap(treemap, treemapData, color);

  /**
   * Tooltip
   */
  const tooltip = addDiv(app, "tooltip");
  tooltip.style("opacity", 0);
  cell
    .on("mousemove", (e, { data }) => {
      const innerHtml = `
        <span>Judul: ${data.name}</span>
        <br/>
        <span>Platform: ${data.category}</span>
        <br/>
        <span>Penjualan: ${data.value} juta</span>
      `;
      tooltip.html(innerHtml);
      tooltip.style("opacity", 1);
      tooltip
        .style("left", e.pageX + 15 + "px")
        .style("top", e.pageY - 25 + "px");
    })
    .on("mouseout", (e, d) => {
      tooltip.style("opacity", 0);
    });

  /**
   * Legend
   */

  const categories = treemapData
    .leaves()
    .map((nodes) => nodes.data.category)
    .filter((category, index, self) => self.indexOf(category) === index);
}

try {
  main();
} catch (e) {
  console.log(e);
}
