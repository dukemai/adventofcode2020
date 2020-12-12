const data = require("./day9.json").map((item) => +item);
const sample = require("./day9-sample.json").map((item) => +item);

const isValid = (num, arr) => {
  return arr.find((item) => item !== num - item && arr.includes(num - item));
};

const doPart1 = (input, preambleNum = 5) => {
  const arrToFind = [...input].splice(preambleNum);
  return arrToFind.find((item, index) => {
    const valid = isValid(item, [...input].splice(index, preambleNum));
    return !valid;
  });
};

const computeTotal = (arr) => arr.reduce((acc, item) => acc + item, 0);

const findTheSet = (sum, arr) => {
  return arr.reduce((acc, curr, index) => {
    if (curr > sum) return acc;
    let next = index + 1;
    let totalUntil = curr;
    const register = [curr];
    while (next < arr.length && totalUntil < sum) {
      register.push(arr[next]);
      totalUntil += arr[next];
      next = next + 1;
    }
    return totalUntil === sum ? [...acc, register] : acc;
  }, []);
};

const doPart2 = (input, preambleNum = 5) => {
  const invalidNum = doPart1(input, preambleNum);
  const invalidIndex = input.indexOf(invalidNum);
  const arr = findTheSet(invalidNum, input.slice(0, invalidIndex));
  const set = new Set(arr.reduce((acc, curr) => [...acc, ...curr], []));
  const min = Math.min(...set);
  const max = Math.max(...set);
  return min + max;
};

console.log(doPart2(data, 25));
