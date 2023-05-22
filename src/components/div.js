function addDiv(d3Obj, id = "", classes = "") {
  return d3Obj.append("div").attr("id", id).attr("class", classes);
}

export { addDiv };
