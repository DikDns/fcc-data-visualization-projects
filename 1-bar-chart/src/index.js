import * as d3 from "d3";
import { getDataset } from "./modules/dataset.js";
import { scaleTime, scaleLinear } from "./modules/scale.js";
import { appendAxisX, appendAxisY } from "./modules/axis.js";
import { appendTooltip } from "./components/tooltip.js";
import { appendSvg, appendTextY } from "./components/svg.js";
import { appendBar, setBarProps } from "./components/chart.js";

async function main() {
  // Select Graph
  const graph = d3.select("#graph");

  // Graph Tooltip
  const tooltip = appendTooltip(graph);

  // Initial SVG Area
  const width = 800;
  const height = 400;

  // Dataset Mapped
  const dataset = await getDataset();

  // Dataset Min & Max
  const minGDP = 0;
  const maxGDP = d3.max(dataset, (d) => d.gdp);
  const minYear = d3.min(dataset, (d) => d.year);
  const maxYear = d3.max(dataset, (d) => d.year);

  // SVG Container
  const svg = appendSvg(graph, width, height);

  // SVG Offset
  const offsetX = 60;
  const offsetY = 400;

  // Label GDP
  appendTextY(svg, "Gross Domestic Product");

  // X Scale
  const xScale = scaleTime(minYear, maxYear, 0, width);
  // Y Scale
  const yScale = scaleLinear(minGDP, maxGDP, height, 0);

  // Axis Properties
  const axisColor = "#2b2d42";
  // X Axis
  appendAxisX(svg, xScale, axisColor, offsetX, offsetY);
  // Y Axis
  appendAxisY(svg, yScale, axisColor, offsetX);

  // Append Bar to SVG
  const bar = appendBar(svg, dataset);

  // Set Bar Properties
  const barColor = "#d90429";
  const barWidth = Math.round(width / dataset.length);
  setBarProps(bar, barWidth, height, barColor, xScale, yScale, offsetX);

  // FCC User Story
  bar
    .attr("class", "bar")
    .attr("data-date", (d) => d.year.getFullYear())
    .attr("data-gdp", (d) => d.gdp);

  // Tooltip Hover Animation
  bar
    .on("mouseover", (e, d) => {
      const i = e.target.getAttribute("index");

      // Set Transition
      tooltip.overlay.transition().duration(0).style("opacity", 0.9);
      // Set Area
      tooltip.overlay.style("height", d + "px").style("width", barWidth + "px");
      // Set Position
      tooltip.overlay
        .style("left", e.clientX + "px")
        .style("top", e.clientY - 50 + "px")
        .style("transform", "translateX(0px)");

      // Set Transition
      tooltip.text.transition().duration(200).style("opacity", 0.9);
      // Set Inner HTML
      tooltip.text
        .html(dataset[i].year.getFullYear() + "<br>" + "$" + dataset[i].gdp)
        .attr("data-date", dataset[i].year.getFullYear());
      // Set Position
      tooltip.text
        .style("left", e.clientX + "px")
        .style("top", e.clientY - 50 + "px")
        .style("transform", "translateX(0px)");
    })
    .on("mouseout", function () {
      tooltip.text.transition().duration(200).style("opacity", 0);
      tooltip.overlay.transition().duration(200).style("opacity", 0);
    });
}

try {
  main();
} catch (e) {
  console.log(e);
}
