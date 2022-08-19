var json2xlsx = require("node-json-xlsx");
var json = {
  foo: "bar",
  qux: "moo",
  poo: 123,
  stux: new Date(),
};

var xlsx = json2xlsx(json);

fs.writeFileSync("data.xlsx", xlsx, "binary");
