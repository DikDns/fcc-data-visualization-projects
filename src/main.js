import "./style.css";
import { min, max, select, format } from "d3";
import { getGlobalTemperature } from "./modules/data";
import { bandScale, linearScale, thresholdScale } from "./modules/scale";
import { formatMonth } from "./modules/utils";
import { addSvg } from "./components/svg";
import { addDiv } from "./components/div";
import { addText } from "./components/text";
import { addAxis, createAxis } from "./components/axis";
import { addLegend, setDataLegend } from "./components/legend";
import { addHeatMap } from "./components/heatMap";

async function main() {
  /**
   * COLOR
   */
  const color = [
    "#223D52",
    "#386385",
    "#71AAB8",
    "#A9E8DC",
    "#FEF7CF",
    "#FFD6A9",
    "#FF9A76",
    "#F55247",
    "#E11D48",
    "#94132F",
    "#610D1F",
  ];

  /**
   * DATASET
   */
  const dataset = await getGlobalTemperature();
  const { monthlyVariance } = dataset;

  const years = monthlyVariance.map((val) => val.year);
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  /**
   * INITIAL SELECTION
   */
  const app = select("#app");
  addText(app, "h1", "Suhu Permukaan Tanah Global Bulanan", "title");
  addText(app, "h2", "1753 - 2015: suhu dasar 8,66℃", "description");

  /**
   * SVG GRAPH
   */
  const svgMargin = {
    y: 30,
    x: 100,
  };
  const svgWidth = 5 * Math.ceil(monthlyVariance.length / 12) + svgMargin.x * 2;
  const svgHeight = svgMargin.y * 16;
  const svgWrapper = addDiv(app, "graph-container");
  const svg = addSvg(svgWrapper, svgWidth, svgHeight);

  /**
   * SCALE
   */
  const scaleMargin = {
    top: svgMargin.y * 2,
    x: svgMargin.x,
    bottom: svgHeight - svgMargin.y * 4,
  };

  const scale = {
    width: svgWidth - scaleMargin.x * 2,
    height: scaleMargin.bottom - scaleMargin.top,
  };

  const xScale = bandScale(years, 0, scale.width);
  const xAxis = createAxis("x", xScale);
  // set ticks to years divisible by 10
  const xTick = xScale.domain().filter((year) => year % 10 === 0);
  xAxis.tickValues(xTick).tickSize(10, 1);
  addAxis(svg, xAxis, scaleMargin.x, scaleMargin.bottom);

  const yScale = bandScale(months, 0, scale.height);
  const yAxis = createAxis("y", yScale, "month");
  yAxis.tickSize(10, 1).tickValues(yScale.domain());
  addAxis(svg, yAxis, scaleMargin.x, scaleMargin.top);

  // Add Y Axis label
  addText(svg, "text", "Bulan", "yText");

  /**
   * LEGEND
   */
  const minTemp = min(monthlyVariance, (d) => d.temperature);
  const maxTemp = max(monthlyVariance, (d) => d.temperature);

  const legendWidth = 400;
  const legendHeight = 300 / color.length;

  const legendThreshold = thresholdScale(minTemp, maxTemp, color);
  const legendXScale = linearScale(minTemp, maxTemp, 0, legendWidth);

  /**
   * LEGEND SVG
   */
  const legend = addLegend(svg, legendHeight);
  const legendData = setDataLegend(legendThreshold, legendXScale);

  /**
   * LEGEND RECT
   */
  legend.addRect(legendData, legendThreshold, legendXScale);

  /**
   * LEGEND X AXIS
   */
  const legendXAxis = createAxis("x", legendXScale, ".1f");
  legendXAxis.tickValues(legendThreshold.domain());
  addAxis(legend, legendXAxis, 0, legendHeight);

  /**
   * HEAT MAP
   */

  const heatMap = addHeatMap(svg, monthlyVariance, scaleMargin);

  // Set Heatmap area and position
  heatMap.set(xScale, yScale, legendThreshold);

  // FCC USER STORY
  heatMap
    .attr("class", "cell")
    .attr("data-month", (d) => d.month)
    .attr("data-year", (d) => d.year)
    .attr("data-temp", (d) => d.temperature);

  // tooltip Mouse Hover
  const tooltip = addDiv(svgWrapper, "tooltip");
  tooltip.style("opacity", 0);

  heatMap
    .on("mouseover", (e, d) => {
      const innerHtml = `
        <span class="date">
          ${d.year} - ${formatMonth(d.month)}
        </span>
        <br />
        <span class="temperature">
          ${format(".1f")(d.temperature)}&#8451;
        </span>
        <br />
        <span class="variance">
          ${format("+.1f")(d.variance)}&#8451;
        </span>
      `;
      tooltip.html(innerHtml);
      tooltip.style("opacity", 1);
      tooltip.style("left", e.pageX + "px").style("top", e.pageY - 75 + "px");
      tooltip.attr("data-year", d.year);
    })
    .on("mouseout", (e, d) => {
      tooltip.style("opacity", 0);
    });
}

try {
  main();
} catch (e) {
  console.log(e);
}
