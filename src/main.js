import "./style.css";
import * as d3 from "d3";
import { getCyclist } from "./modules/cyclist";
import { linearScale, timeScale } from "./modules/scale";
import { addSvg } from "./components/svg";
import { addText } from "./components/text";
import { addAxis, createAxis, timeFormat } from "./components/axis";
import { addDiv } from "./components/div";
import { addCircle, setCircle, setAttrCircle } from "./components/circle";

async function main() {
  /**
   * DATASET
   */
  const dataset = await getCyclist();

  const xMin = d3.min(dataset, (d) => d.Year - 1);
  const xMax = d3.max(dataset, (d) => d.Year + 1);
  const yMin = d3.min(dataset, (d) => d.Time);
  const yMax = d3.max(dataset, (d) => d.Time);

  /**
   * INITIAL SELECTION
   */
  const app = d3.select("#app");

  const title = addText(
    app,
    "h1",
    "Doping pada Balap Sepeda Profesional",
    "title"
  );

  const subtitle = addText(
    app,
    "h2",
    "35 Pesepeda tercepat di Alpe d'Huez",
    "subtitle"
  );

  /**
   * SVG GRAPH
   */
  const color = d3.scaleOrdinal(["#2563eb", "#ca8a04"]);
  const svgMargin = {
    top: 100,
    right: 20,
    bottom: 30,
    left: 60,
  };
  const svgWidth = 920 - svgMargin.left - svgMargin.right;
  const svgHeight = 630 - svgMargin.top - svgMargin.bottom;
  const svg = addSvg(
    app,
    svgWidth + svgMargin.left + svgMargin.right,
    svgHeight + svgMargin.top + svgMargin.bottom
  );
  svg.attr("transform", `translate(${0}, ${-svgMargin.top})`);

  const yText = addText(svg, "text", "Waktu dalam Menit", "yText");

  /**
   * SCALE
   */
  const xScale = linearScale(xMin, xMax, 0, svgWidth);
  const xAxis = createAxis("x", xScale, "d");
  addAxis(svg, xAxis, svgMargin.left, svgHeight + svgMargin.top);

  const yScale = timeScale(yMin, yMax, 0, svgHeight);
  const yAxis = createAxis("y", yScale, "time");
  addAxis(svg, yAxis, svgMargin.left, svgMargin.top);

  /**
   * CIRCLE
   */
  const dot = addCircle(svg, dataset, ".dot");

  const cx = (d) => xScale(d.Year) + svgMargin.left;
  const cy = (d) => yScale(d.Time) + svgMargin.top;
  setCircle(dot, 6, cx, cy);

  setAttrCircle(dot, ["class", "dot"], ["fill", (d) => color(d.Doping !== "")]);

  // Set FCC User Story
  setAttrCircle(
    dot,
    ["data-xvalue", (d) => d.Year],
    ["data-yvalue", (d) => d.Time.toISOString()]
  );

  // Tooltip Hover
  const tooltip = addDiv(app, "tooltip", "tooltip");
  tooltip.style("opacity", 0);

  dot
    .on("mouseover", (e, d) => {
      tooltip.style("opacity", 0.75);
      tooltip.style("left", e.pageX + "px").style("top", e.pageY - 28 + "px");
      tooltip.attr("data-year", d.Year);
      tooltip.html(
        d.Name +
          ": " +
          d.Nationality +
          "<br/>" +
          "Tahun: " +
          d.Year +
          ", Waktu: " +
          timeFormat("%M:%S")(d.Time) +
          (d.Doping ? "<br/><br/>" + d.Doping : "")
      );
    })
    .on("mouseout", (e, d) => {
      tooltip.style("opacity", 0);
    });

  /**
   * LEGEND
   */
  const legendContainer = svg.append("g").attr("id", "legend");

  const legend = legendContainer
    .selectAll("#legend")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("class", "legend-label")
    .attr(
      "transform",
      (_, i) => "translate(0," + (svgHeight / 2 - i * 30) + ")"
    );

  legend
    .append("rect")
    .attr("x", svgWidth + 30)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

  legend
    .append("text")
    .attr("x", svgWidth + 25)
    .attr("y", 9)
    .attr("dy", ".35em")
    .attr("class", "legend-label")
    .style("text-anchor", "end")
    .text((d) =>
      d ? "Pesepeda dengan tuduhan doping" : "Tidak ada tuduhan doping"
    );
}

try {
  main();
} catch (e) {
  console.log(e);
}
