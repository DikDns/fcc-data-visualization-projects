import "./style.css";
import { getCyclist } from "./modules/cyclist.js";

async function main() {
  const dataset = await getCyclist();
  console.log(dataset);
}

try {
  main();
} catch (e) {
  console.log(e);
}
