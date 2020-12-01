const data = require("./day1-part1.json").map((c) => +c);

const playPart1 = (input) => {
  const entries = input.reduce((acc, curr) => {
    if (curr > 2020) return acc;
    const other = 2020 - curr;

    if (acc[`${curr}`] || acc[`${other}`]) return acc;
    if (input.includes(other)) return { ...acc, [`${curr}`]: other };
    return acc;
  }, {});
  return Object.entries(entries).reduce(
    (acc, [key, value]) => acc * +key * +value,
    1
  );
};

const findTheOthers = (inputArr, sum) =>
  inputArr.reduce((acc, curr) => {
    if (curr > sum) return acc;
    const other = sum - curr;

    if (acc[`${curr}`] || acc[`${other}`]) return acc;
    if (inputArr.includes(other)) return { ...acc, [`${curr}`]: other };
    return acc;
  }, {});

const playPart2 = (input) => {
  const result = input.reduce((acc, curr, index) => {
    if (curr > 2020) return acc;
    const sum = 2020 - curr;
    const inputArr = [...input];
    inputArr.splice(index, 1);
    const entries = Object.entries(findTheOthers(inputArr, sum));
    entries.forEach(([key, value]) => {
      const isExisted = Object.values(acc).find((arr) => arr.includes(value));
      if (!isExisted) acc[`${curr}.${key}.${value}`] = [curr, +key, value];
    });

    return acc;
  }, {});
  return Object.values(result).reduce(
    (acc, [num1, num2, num3]) => acc * +num1 * +num2 * +num3,
    1
  );
};

console.log(playPart2(data));
