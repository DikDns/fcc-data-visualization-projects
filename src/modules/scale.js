import * as d3 from "d3";

function scaleTime(minDomain, maxDomain, minRange, maxRange) {
  const newMaxDomain = new Date(maxDomain.getFullYear() + 1, 1, 1);
  return d3
    .scaleTime()
    .domain([minDomain, newMaxDomain])
    .range([minRange, maxRange]);
}

function scaleLinear(minDomain, maxDomain, minRange, maxRange) {
  return d3
    .scaleLinear()
    .domain([minDomain, maxDomain])
    .range([minRange, maxRange]);
}

export { scaleTime, scaleLinear };
