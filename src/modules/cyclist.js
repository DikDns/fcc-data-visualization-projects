import { getFetch } from "./fetch.js";

const cyclistDataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

export async function getCyclist() {
  return await getFetch(cyclistDataUrl);
}
