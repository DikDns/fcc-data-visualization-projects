import { scaleLinear, scaleTime } from "d3";

function timeScale(minDomain, maxDomain, minRange, maxRange) {
  return scaleTime().domain([minDomain, maxDomain]).range([minRange, maxRange]);
}

function linearScale(minDomain, maxDomain, minRange, maxRange) {
  return scaleLinear()
    .domain([minDomain, maxDomain])
    .range([minRange, maxRange]);
}

export { timeScale, linearScale };
