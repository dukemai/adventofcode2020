const data = require("./day5.json");
const decode = (input) => {
  return [...input].reduce(
    (acc, step, index) => {
      const halfWay = Math.floor((acc.row.upper - acc.row.lower + 1) / 2);
      const halfRow = Math.floor((acc.column.upper - acc.column.lower + 1) / 2);
      switch (step) {
        case "F":
          acc.row.upper = acc.row.upper - (halfWay || 1);
          break;
        case "B":
          acc.row.lower = acc.row.lower + (halfWay || 1);
          break;
        case "L":
          acc.column.upper = acc.column.upper - halfRow;
          break;
        case "R":
          acc.column.lower = acc.column.lower + halfRow;
          break;
      }
      return acc;
    },
    { row: { lower: 0, upper: 127 }, column: { lower: 0, upper: 7 } }
  );
};

const doPart1 = (input) => {
  return input.reduce((acc, curr) => {
    const { row, column } = decode(curr);
    const id = row.lower * 8 + column.lower;
    return id > acc ? id : acc;
  }, 0);
};
console.log(doPart1(data));