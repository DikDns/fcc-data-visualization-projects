import "./style.css";
import * as d3 from "d3";
import { getCyclist } from "./modules/cyclist";
import { linearScale, timeScale } from "./modules/scale";
import { addSvg } from "./components/svg";
import { addTitle } from "./components/title";
import { addAxis, createAxis } from "./components/axis";

async function main() {
  const dataset = await getCyclist();

  const xMin = d3.min(dataset, (d) => d.Year);
  const xMax = d3.max(dataset, (d) => d.Year);
  const yMin = d3.min(dataset, (d) => d.Time);
  const yMax = d3.max(dataset, (d) => d.Time);

  console.log(dataset);

  const app = d3.select("#app");

  const title = addTitle(
    app,
    "h1",
    "Doping pada Balap Sepeda Profesional",
    "title"
  );

  const subtitle = addTitle(
    app,
    "h2",
    "35 Pesepeda tercepat di Alpe d'Huez",
    "subtitle"
  );

  const svgMargin = {
    top: 100,
    right: 20,
    bottom: 30,
    left: 60,
  };
  const svgWidth = 920 - svgMargin.left - svgMargin.right;
  const svgHeight = 400 - svgMargin.top - svgMargin.bottom;
  const svg = addSvg(app, svgWidth, svgHeight);

  const xScale = linearScale(xMin, xMax, 0, svgWidth);
  const xAxis = createAxis("x", xScale, "d");
  addAxis(svg, xAxis, svgMargin.left, 0);

  const yScale = timeScale(yMin, yMax, 0, svgHeight);
  const yAxis = createAxis("y", yScale, "time");
  addAxis(svg, yAxis, svgMargin.left, 0);
}

try {
  main();
} catch (e) {
  console.log(e);
}
