import { getFetch } from "./fetch.js";

const videoGameSalesData =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

export async function getSalesData() {
  const data = await getFetch(videoGameSalesData);
  return data;
}
