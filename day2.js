const data = require("./day2-part1.json");

const isSatisfied = (input) => {
  const [rule, password] = input.split(":");
  const [numbers, character] = rule.split(" ");
  const [lower, upper] = numbers.split('-');
  const onlyCharacterPassword = password.replace(
    new RegExp(`[^${character}]`, "g"),
    ""
  );
  return onlyCharacterPassword.length <= +upper && onlyCharacterPassword.length >= +lower;
};

const playPart1 = (input) => {
  return input.reduce((acc, curr) => {
    if (isSatisfied(curr)) {
      console.log(curr);
    }
    return (acc = acc + (isSatisfied(curr) ? 1 : 0));
  }, 0);
};

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

console.log(playPart1(data));
