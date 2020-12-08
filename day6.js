const data = require("./day6.json");
const sample = require("./day6-sample.json");

const doPart1 = (input) => {
  return input.reduce(
    (acc, curr, index) => {
      if (curr) {
        [...curr].forEach((key) => {
          acc.current[key] = 1;
        });
      }

      if (curr === "" || input.length === index + 1) {
        acc.count += Object.keys(acc.current).length;
        acc.current = {};
      }

      return acc;
    },
    { count: 0, current: {} }
  );
};

const doPart2 = (input) => {
  return input.reduce(
    (acc, curr, index) => {
      if (curr) {
        acc.group = (acc.group || 0) + 1;
        [...curr].forEach((key) => {
          acc.current[key] = (acc.current[key] || 0) + 1;
        });
      }

      if (curr === "" || input.length === index + 1) {
        acc.count += Object.values(acc.current).filter(
          (item) => item === acc.group
        ).length;
        acc.current = {};
        acc.group = 0;
      }

      return acc;
    },
    { count: 0, current: {}, group: 0 }
  );
};

console.log(doPart2(data));
