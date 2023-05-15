import { getFetch } from "./fetch.js";

async function getDataset() {
  const data = await getFetch("./src/gdp.json");

  const mappedData = data.map((dt) => ({
    year: new Date(dt.year, 1, 1),
    gdp: dt.gdp,
  }));
  mappedData.reverse();

  return mappedData;
}

export { getDataset };
