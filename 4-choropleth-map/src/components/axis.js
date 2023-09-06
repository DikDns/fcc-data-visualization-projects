import { axisBottom, axisLeft, format, timeFormat } from "d3";
import { formatMonth } from "../modules/utils";

function createAxis(type, scale, tickFormat = undefined) {
  let axis;

  switch (type) {
    case "x":
      axis = axisBottom().scale(scale);
      axis.type = "x";
      break;
    case "y":
      axis = axisLeft().scale(scale);
      axis.type = "y";
      break;
    default:
      throw new Error("Invalid Axis Type!");
  }

  switch (tickFormat) {
    case undefined:
      break;
    case "d":
      axis.tickFormat(format("d"));
      break;
    case "time":
      axis.tickFormat(timeFormat("%M:%S"));
      break;
    case "month":
      axis.tickFormat((month) => formatMonth(month));
      break;
    case "%":
      axis.tickFormat((x) => `${Math.round(x)}%`);
      break;
    default:
      axis.tickFormat(format(tickFormat));
  }

  return axis;
}

function addAxis(d3Obj, axis) {
  return d3Obj
    .append("g")
    .call(axis)
    .attr("id", `${axis.type.toLowerCase()}-axis`);
}

export { createAxis, addAxis, timeFormat };
