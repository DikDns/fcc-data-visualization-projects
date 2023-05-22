import "./style.css";
import { min, max, select } from "d3";
import { getGlobalTemperature } from "./modules/data";
import { linearScale, thresholdScale } from "./modules/scale";
import { addSvg } from "./components/svg";
import { addText } from "./components/text";
import { addAxis, createAxis, timeFormat } from "./components/axis";
import { addDiv } from "./components/div";
import { addCircle, setCircle, setAttrCircle } from "./components/circle";

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
  const yMin = min(monthlyVariance, (d) => d.month);
  const yMax = max(monthlyVariance, (d) => d.month);

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
  const svgHeight = svgMargin.y * 14;
  const svg = addSvg(app, svgWidth, svgHeight);

  /**
   * SCALE
   */
  const xScale = linearScale(xMin, xMax, 0, svgWidth - svgMargin.x * 2);
  const xAxis = createAxis("x", xScale, "d");
  addAxis(svg, xAxis, svgMargin.x, svgHeight - svgMargin.y);

  const yScale = linearScale(yMin, yMax, 0, svgHeight - svgMargin.y * 2);
  const yAxis = createAxis("y", yScale, "month");
  addAxis(svg, yAxis, svgMargin.x, svgMargin.y);
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
  const legendContainer = svg.append("g").attr("id", "legend");

  const legendData = legendThreshold.range().map((color) => {
    const d = legendThreshold.invertExtent(color);
    if (d[0] === null) {
      d[0] = legendXScale.domain()[0];
    }
    if (d[1] === null) {
      d[1] = legendXScale.domain()[1];
    }
    return d;
  });

  const legend = legendContainer
    .selectAll("#legend")
    .data(legendData)
    .enter()
    .append("rect")
    .style("fill", (d) => legendThreshold(d[0]))
    .attr("x", (d) => legendXScale(d[0]))
    .attr("y", 0)
    .attr("width", (d, i) => {
      const fixedWidth = legendXScale(d[1]) - legendXScale(d[0]);
      return d[0] && d[1] ? fixedWidth : legendXScale(null);
    })
    .attr("height", legendHeight);

  const legendXAxis = createAxis("x", legendXScale, ".1f");

  // legend
  //   .append("rect")
  //   .attr("x", svgWidth + 30)
  //   .attr("width", 18)
  //   .attr("height", 18)
  //   .attr("class", "legend-rect")
  //   .style("fill", color);

  // legend
  //   .append("text")
  //   .attr("x", svgWidth + 25)
  //   .attr("y", 9)
  //   .attr("dy", ".35em")
  //   .attr("class", "legend-label")
  //   .style("text-anchor", "end")
  //   .text((d) =>
  //     d ? "Pesepeda dengan tuduhan doping" : "Tidak ada tuduhan doping"
  //   );

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
