import "./style.css";
import { getCyclist } from "./modules/cyclist.js";
import app from "./components/app";
import title from "./components/title";
import subtitle from "./components/subtitle";

async function main() {
  const dataset = await getCyclist();
  console.log(dataset);
}

try {
  main();
} catch (e) {
  console.log(e);
}
