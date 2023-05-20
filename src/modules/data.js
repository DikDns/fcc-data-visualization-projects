import { getFetch } from "./fetch.js";

const globalTemperatureUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

function round(x, nth = 1) {
  if (nth < 1) return 0;
  return Math.round(x * nth) / nth;
}

export async function getGlobalTemperature() {
  const data = await getFetch(globalTemperatureUrl);
  return {
    ...data,
    // map Month to Zero-Indexes & calc temperature
    monthlyVariance: data.monthlyVariance.map((d) => ({
      ...d,
      month: --d.month,
      // Round to tenth decimal places (a.bcde => a.x)
      temperature: round(data.baseTemperature + d.variance, 10),
      variance: round(d.variance, 10),
    })),
  };
}
