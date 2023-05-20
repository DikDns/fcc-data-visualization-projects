import { getFetch } from "./fetch.js";

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
      temperature: data.baseTemperature + d.variance,
    })),
  };
}
