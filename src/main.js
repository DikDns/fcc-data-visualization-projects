import "./style.css";
import { min, max, select, format, geoPath, geoEquirectangular } from "d3";
import * as topojson from "topojson-client";
import { getSekolah, getProvinsi } from "./modules/data";
import { thresholdScale } from "./modules/scale";
import { addText } from "./components/text";

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
   * SVG GRAPH
   */
  const width = 960;
  const height = 600;
  const svg = select("#map").attr("width", width).attr("height", height);

  const indonesia = await getProvinsi();

  const featuresIndonesia = topojson.feature(
    indonesia,
    indonesia.objects.provinces
  ).features;

  const projection = geoEquirectangular()
    .scale(1180)
    .rotate([-120, 0])
    .translate([width / 2 + 40, height / 2]);
  const path = geoPath().projection(projection);

  /*
   * INITIAL SELECTION
   */
  const app = select("#app");

  /**
   * SCALE
   */

  const colorScale = thresholdScale(minKesenjangan, maxKesenjangan, color);

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

  svg
    .append("path")
    .datum(
      topojson.mesh(indonesia, indonesia.objects.provinces, function (a, b) {
        return a !== b;
      })
    )
    .attr("class", "states-border")
    .attr("d", path);

  // const scaleMargin = {
  //   top: svgMargin.y * 2,
  //   x: svgMargin.x,
  //   bottom: svgHeight - svgMargin.y * 4,
  // };
  // const scale = {
  //   width: svgWidth - scaleMargin.x * 2,
  //   height: scaleMargin.bottom - scaleMargin.top,
  // };
  // const xScale = bandScale(years, 0, scale.width);
  // const xAxis = createAxis("x", xScale);
  // // set ticks to years divisible by 10
  // const xTick = xScale.domain().filter((year) => year % 10 === 0);
  // xAxis.tickValues(xTick).tickSize(10, 1);
  // addAxis(svg, xAxis, scaleMargin.x, scaleMargin.bottom);
  // const yScale = bandScale(months, 0, scale.height);
  // const yAxis = createAxis("y", yScale, "month");
  // yAxis.tickSize(10, 1).tickValues(yScale.domain());
  // addAxis(svg, yAxis, scaleMargin.x, scaleMargin.top);
  // // Add Y Axis label
  // addText(svg, "text", "Bulan", "yText");
  // /**
  //  * LEGEND
  //  */
  // const minTemp = min(monthlyVariance, (d) => d.temperature);
  // const maxTemp = max(monthlyVariance, (d) => d.temperature);
  // const legendWidth = 400;
  // const legendHeight = 300 / color.length;
  // const legendThreshold = thresholdScale(minTemp, maxTemp, color);
  // const legendXScale = linearScale(minTemp, maxTemp, 0, legendWidth);
  // /**
  //  * LEGEND SVG
  //  */
  // const legend = addLegend(svg, legendHeight);
  // const legendData = setDataLegend(legendThreshold, legendXScale);
  // /**
  //  * LEGEND RECT
  //  */
  // legend.addRect(legendData, legendThreshold, legendXScale);
  // /**
  //  * LEGEND X AXIS
  //  */
  // const legendXAxis = createAxis("x", legendXScale, ".1f");
  // legendXAxis.tickValues(legendThreshold.domain());
  // addAxis(legend, legendXAxis, 0, legendHeight);
  // /**
  //  * HEAT MAP
  //  */
  // const heatMap = addHeatMap(svg, monthlyVariance, scaleMargin);
  // // Set Heatmap area and position
  // heatMap.set(xScale, yScale, legendThreshold);
  // // FCC USER STORY
  // heatMap
  //   .attr("class", "cell")
  //   .attr("data-month", (d) => d.month)
  //   .attr("data-year", (d) => d.year)
  //   .attr("data-temp", (d) => d.temperature);
  // // tooltip Mouse Hover
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
