import { scaleLinear, scaleTime } from "d3";

function timeScale(minDomain, maxDomain, minRange, maxRange) {
  const newMaxDomain = new Date(maxDomain.getFullYear() + 1, 1, 1);
  return scaleTime()
    .domain([minDomain, newMaxDomain])
    .range([minRange, maxRange]);
}

function linearScale(minDomain, maxDomain, minRange, maxRange) {
  return scaleLinear()
    .domain([minDomain, maxDomain])
    .range([minRange, maxRange]);
}

export { timeScale, linearScale };
