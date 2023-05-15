import "./style.css";
import { getCyclist } from "./modules/cyclist.js";
import app from "./components/app";
import title from "./components/title";
import subtitle from "./components/subtitle";
import svg from "./components/svg";

async function main() {
  const dataset = await getCyclist();
}

try {
  main();
} catch (e) {
  console.log(e);
}
