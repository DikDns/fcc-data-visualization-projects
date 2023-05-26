import { getFetch } from "./fetch.js";

const videoGameSalesData =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

export const colorScheme20 = [
  "#8F0C0C",
  "#dc2626",
  "#008F28",
  "#25DB59",
  "#7D5601",
  "#CA8A04",
  "#002C7D",
  "#044AC9",
  "#5B139E",
  "#9333EA",
  "#999E03",
  "#E5EB34",
  "#4A0F00",
  "#962305",
  "#014A33",
  "#059669",
  "#4B5563",
  "#748DB0",
  "#635B4C",
  "#B09663",
];

export async function getSalesData() {
  const data = await getFetch(videoGameSalesData);
  return data;
}
