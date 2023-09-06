import { getFetch } from "./fetch.js";
import { round } from "./utils.js";

const globalTemperatureUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

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
