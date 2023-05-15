import { getFetch } from "./fetch.js";

const cyclistDataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

export async function getCyclist() {
  const data = await getFetch(cyclistDataUrl);
  return data.map((d) => {
    const parsedTime = d.Time.split(":");
    return {
      ...d,
      Place: +d.Place,
      Time: new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]),
    };
  });
}
