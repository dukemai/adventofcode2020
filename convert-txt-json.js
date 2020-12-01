const fs = require("fs");
const path = require("path");


const [file] = process.argv.slice(2);;

const transform = () => {
  const txt = fs.readFileSync(file).toString();
  fs.writeFileSync(`./${path.parse(file).name}.json`, JSON.stringify(txt.trim().split("\n")));
};
transform();