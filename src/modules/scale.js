import { scaleLinear, scaleTime, scaleThreshold, scaleBand } from "d3";

export function bandScale(domain, minRange, maxRange) {
  return scaleBand().domain(domain).rangeRound([minRange, maxRange]).padding(0);
}

export function timeScale(minDomain, maxDomain, minRange, maxRange) {
  return scaleTime().domain([minDomain, maxDomain]).range([minRange, maxRange]);
}

export function linearScale(minDomain, maxDomain, minRange, maxRange) {
  return scaleLinear()
    .domain([minDomain, maxDomain])
    .range([minRange, maxRange]);
}

export function thresholdScale(minDomain, maxDomain, inputRange) {
  const domainArr = [];
  const count = inputRange.length;
  const step = (maxDomain - minDomain) / count;

  for (let i = 1; i < count; i++) {
    domainArr.push(minDomain + i * step);
  }

  return scaleThreshold().domain(domainArr).range(inputRange);
}
