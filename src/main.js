import "./style.css";
import { min, max, select, geoPath, geoEquirectangular } from "d3";
import * as topojson from "topojson-client";
import { getSekolah, getIndonesia } from "./modules/data";
import { linearScale, thresholdScale } from "./modules/scale";
import { createAxis, addAxis } from "./components/axis";
import { addLegend, setDataLegend } from "./components/legend";

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
  const sekolahData = await getSekolah();
  const minKesenjangan = min(
    sekolahData,
    (d) => d.persentaseKesenjangan.SMANegeri
  );
  const maxKesenjangan = max(
    sekolahData,
    (d) => d.persentaseKesenjangan.SMANegeri
  );

  /**
   * SVG INIT
   */
  const width = 960;
  const height = 600;
  const svg = select("#map").attr("width", width).attr("height", height);

  /**
   * SCALE
   */

  const colorScale = thresholdScale(minKesenjangan, maxKesenjangan, color);

  /**
   * INDONESIA MAP
   */

  // Initial data map
  const indonesia = await getIndonesia();

  const featuresIndonesia = topojson.feature(
    indonesia,
    indonesia.objects.provinces
  ).features;

  const projection = geoEquirectangular()
    .scale(1180)
    .rotate([-120, 0])
    .translate([width / 2 + 40, height / 2]);
  const path = geoPath().projection(projection);

  // Rendering map
  svg
    .append("g")
    .attr("class", "provinces")
    .selectAll("path")
    .data(featuresIndonesia)
    .enter()
    .append("path")
    .attr("class", "province")
    .attr("data-provinsi", ({ properties: props }) => props.provinsi)
    .attr("data-sma-negeri-kesenjangan", ({ properties: props }) => {
      const result = sekolahData.filter((x) => x.provinsi === props.provinsi);
      if (!result[0]) return 0;
      return result[0].persentaseKesenjangan.SMANegeri;
    })
    .attr("fill", ({ properties: props }) => {
      const result = sekolahData.filter((x) => x.provinsi === props.provinsi);
      if (!result[0]) return colorScale(0);
      return colorScale(result[0].persentaseKesenjangan.SMANegeri);
    })
    .attr("d", path);

  // Rendering the border between provincies
  svg
    .append("path")
    .datum(
      topojson.mesh(indonesia, indonesia.objects.provinces, function (a, b) {
        return a !== b;
      })
    )
    .attr("class", "states-border")
    .attr("d", path);

  /**
   * LEGEND
   */

  const legendXScale = linearScale(minKesenjangan, maxKesenjangan, 600, 860);

  const legend = addLegend(svg, 8);
  const legendData = setDataLegend(colorScale, legendXScale);

  legend.addRect(legendData, colorScale, legendXScale);

  /**
   * LEGEND X AXIS
   */

  const legendXAxis = createAxis("x", legendXScale, "%");
  legendXAxis.tickValues(colorScale.domain());
  addAxis(legend, legendXAxis);

  // tooltip Mouse Hover
  // const tooltip = addDiv(svgWrapper, "tooltip");
  // tooltip.style("opacity", 0);
  // heatMap
  //   .on("mouseover", (e, d) => {
  //     const innerHtml = `
  //       <span class="date">
  //         ${d.year} - ${formatMonth(d.month)}
  //       </span>
  //       <br />
  //       <span class="temperature">
  //         ${format(".1f")(d.temperature)}&#8451;
  //       </span>
  //       <br />
  //       <span class="variance">
  //         ${format("+.1f")(d.variance)}&#8451;
  //       </span>
  //     `;
  //     tooltip.html(innerHtml);
  //     tooltip.style("opacity", 1);
  //     tooltip.style("left", e.pageX + "px").style("top", e.pageY - 75 + "px");
  //     tooltip.attr("data-year", d.year);
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
