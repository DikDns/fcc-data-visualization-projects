import "./style.css";
import { min, max, select } from "d3";
import { getGlobalTemperature } from "./modules/data";
import { bandScale, linearScale, thresholdScale } from "./modules/scale";
import { addSvg } from "./components/svg";
import { addText } from "./components/text";
import { addAxis, createAxis } from "./components/axis";
import { addLegend, setDataLegend } from "./components/legend";

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
  console.log(dataset);

  const xMin = min(monthlyVariance, (d) => d.year - 1);
  const xMax = max(monthlyVariance, (d) => d.year + 1);
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  /**
   * INITIAL SELECTION
   */
  const app = select("#app");

  const title = addText(
    app,
    "h1",
    "Suhu Permukaan Tanah Global Bulanan",
    "title"
  );

  const description = addText(
    app,
    "h2",
    "1753 - 2015: suhu dasar 8,66℃",
    "description"
  );

  /**
   * SVG GRAPH
   */
  const svgMargin = {
    y: 30,
    x: 80,
  };
  const svgWidth = 5 * Math.ceil(monthlyVariance.length / 12) + svgMargin.x * 2;
  const svgHeight = svgMargin.y * 16;
  const svg = addSvg(app, svgWidth, svgHeight);

  /**
   * SCALE
   */
  const scaleMargin = {
    top: svgMargin.y,
    x: svgMargin.x,
    bottom: svgHeight - svgMargin.y * 4,
  };
  const scale = {
    width: svgWidth - scaleMargin.bottom,
    height: scaleMargin.bottom - scaleMargin.top,
  };

  const xScale = linearScale(xMin, xMax, 0, scale.width);
  const xAxis = createAxis("x", xScale, "d");
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
   * CIRCLE
   */
  // const dot = addCircle(svg, dataset, ".dot");

  // const cx = (d) => xScale(d.Year) + svgMargin.left;
  // const cy = (d) => yScale(d.Time) + svgMargin.top;
  // setCircle(dot, 6, cx, cy);

  // setAttrCircle(dot, ["class", "dot"], ["fill", (d) => color(d.Doping !== "")]);

  // // Set FCC User Story
  // setAttrCircle(
  //   dot,
  //   ["data-xvalue", (d) => d.Year],
  //   ["data-yvalue", (d) => d.Time.toISOString()]
  // );

  // // Tooltip Hover
  // const tooltip = addDiv(app, "tooltip", "tooltip");
  // tooltip.style("opacity", 0);

  // dot
  //   .on("mouseover", (e, d) => {
  //     tooltip.style("opacity", 0.75);
  //     tooltip.style("left", e.pageX + "px").style("top", e.pageY - 28 + "px");
  //     tooltip.attr("data-year", d.Year);
  //     tooltip.html(
  //       d.Name +
  //         ": " +
  //         d.Nationality +
  //         "<br/>" +
  //         "Tahun: " +
  //         d.Year +
  //         ", Waktu: " +
  //         timeFormat("%M:%S")(d.Time) +
  //         (d.Doping ? "<br/><br/>" + d.Doping : "")
  //     );
  //   })
  //   .on("mouseout", (e, d) => {
  //     tooltip.style("opacity", 0);
  //   });
}

try {
  main();
} catch (e) {
  console.log(e);
}
