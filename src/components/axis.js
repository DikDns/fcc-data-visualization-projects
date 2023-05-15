import { axisBottom, axisLeft, format, timeFormat } from "d3";

function createAxis(type, scale, tickFormat) {
  let axis;

  switch (type.toLowerCase()) {
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

  switch (tickFormat.toLowerCase()) {
    case "d":
      axis.tickFormat(format("d"));
      break;
    case "time":
      axis.tickFormat(timeFormat("%M:%S"));
  }

  return axis;
}

function addAxis(d3Obj, axis, offsetX = 0, offsetY = 0) {
  return d3Obj
    .append("g")
    .call(axis)
    .attr("id", `${axis.type.toLowerCase()}-axis`)
    .attr("transform", `translate(${offsetX}, ${offsetY})`);
}

export { createAxis, addAxis };
