import { scaleLinear, scaleTime, scaleThreshold } from "d3";

function timeScale(minDomain, maxDomain, minRange, maxRange) {
  return scaleTime().domain([minDomain, maxDomain]).range([minRange, maxRange]);
}

function linearScale(minDomain, maxDomain, minRange, maxRange) {
  return scaleLinear()
    .domain([minDomain, maxDomain])
    .range([minRange, maxRange]);
}

function thresholdScale(minDomain, maxDomain, inputRange) {
  const domainArr = [];
  const count = inputRange.length;
  const step = (minDomain - maxDomain) / count;

  for (let i = 1; i < count; i++) {
    domainArr.push(minDomain + i * step);
  }

  return scaleThreshold().domain(domainArr).range(inputRange);
}

export { timeScale, linearScale, thresholdScale };
