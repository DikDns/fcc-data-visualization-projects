function addDiv(d3Obj, id, classes) {
  const div = d3Obj.append("div");
  if (id) {
    div.attr("id", id);
  }
  if (classes) {
    div.attr("class", classes);
  }
  return div;
}

export { addDiv };
