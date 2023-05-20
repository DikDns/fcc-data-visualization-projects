function addCircle(d3Obj, dataset, selectAll) {
  return d3Obj.selectAll(selectAll).data(dataset).enter().append("circle");
}

function setCircle(circle, radius, cx, cy) {
  return circle.attr("r", radius).attr("cx", cx).attr("cy", cy);
}

function setAttrCircle(circle, ...attrArr) {
  attrArr.forEach((attr) => {
    circle.attr(attr[0], attr[1]);
  });
  return attrArr;
}

export { addCircle, setCircle, setAttrCircle };
