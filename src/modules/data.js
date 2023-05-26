import { getFetch } from "./fetch.js";

const videoGameSalesData =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

export const colorScheme20 = [
  "#dc2626",
  "#fda4af",
  "#ea580c",
  "#fcd34d",
  "#ca8a04",
  "#bef264",
  "#16a34a",
  "#6ee7b7",
  "#0d9488",
  "#67e8f9",
  "#0284c7",
  "#93c5fd",
  "#4f46e5",
  "#c4b5fd",
  "#9333ea",
  "#f0abfc",
  "#475569",
  "#d1d5db",
  "#52525b",
  "#d6d3d1",
];

export async function getSalesData() {
  const data = await getFetch(videoGameSalesData);
  return data;
}
