import "./style.css";
import * as d3 from "d3";
// import { dotFormat } from "./modules/utils";
// import { getSekolah, getIndonesia } from "./modules/data";
// import { linearScale, thresholdScale } from "./modules/scale";
// import { createAxis, addAxis } from "./components/axis";
// import { addLegend, setDataLegend } from "./components/legend";
// import { addDiv } from "./components/div";

/**
 * COLOR
 */
const color = [
  "#fecaca",
  "#fca5a5",
  "#f87171",
  "#ef4444",
  "#dc2626",
  "#b91c1c",
  "#991b1b",
  "#7f1d1d",
  "#450a0a",
];

async function main() {
  /**
   * DATASET
   */

  /**
   * SVG INIT
   */
  const width = 960;
  const height = 600;
  // const svg = select("#map").attr("width", width).attr("height", height);

  /**
   * SCALE
   */

  /**
   * INDONESIA MAP
   */

  // Initial data map

  /**
   * TOOLTIP MOUSE HOVER
   */
  // const app = select("#app");
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

try {
  main();
} catch (e) {
  console.log(e);
}
