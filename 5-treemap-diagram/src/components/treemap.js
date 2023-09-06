import * as d3 from "d3";

/**
 * @param {Array} dataset
 * @param {Number} width
 * @param {Number} height
 * @param {Number} gap
 * @returns D3 hierarchy Node
 */
export function createTreemap(dataset, width, height, gap = 1) {
  const treemap = d3.treemap().size([width, height]).paddingInner(gap);
  const hierarchyData = d3
    .hierarchy(dataset)
    .eachBefore((d) => {
      d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
    })
    .sum(sumBySize)
    .sort((a, b) => b.height - a.height || b.value - a.value);

  treemap(hierarchyData);
  return hierarchyData;
}

/**
 * @param {Object} d3Obj
 * @param {Array} hierarchyData
 * @param {Object} colorScale
 * @returns D3 Cell Object
 */
export function appendTreemap(d3Obj, hierarchyData, colorScale) {
  const cell = d3Obj
    .selectAll("g")
    .data(hierarchyData.leaves())
    .enter()
    .append("g")
    .attr("class", "group")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0);

  cell
    .append("rect")
    .attr("class", "tile")
    .attr("id", (d) => d.data.id)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("fill", (d) => colorScale(d.data.category));

  cell
    .append("text")
    .attr("class", "tile-text")
    .selectAll("tspan")
    .data(tileTextData)
    .enter()
    .append("tspan")
    .attr("x", 4)
    .attr("y", (_, i) => 13 + i * 10)
    .text((d) => d);

  return cell;
}

function tileTextData(d) {
  const nameArr = d.data.name.split(/(?=[A-Z][^A-Z])/g);
  // Overflow Prevention
  const currentHeight = d.y1 - d.y0;
  if (nameArr.length * 11 > currentHeight + 1) {
    const n = Math.ceil((nameArr.length * 12) / currentHeight);
    return removeLastElement(nameArr, n);
  }
  return nameArr;
}

function sumBySize(d) {
  return d.value;
}

function removeLastElement(arr, n) {
  let newArr = arr.map((x) => x);
  for (let i = 0; i < n; i++) {
    newArr.pop();
  }
  return newArr;
}
