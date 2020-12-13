const data = require("./day10.json").map((m) => +m);
const sample = require("./day10-sample.json").map((m) => +m);

const findTheChain = (input) => {
  const sorted = input.sort((a, b) => a - b);
  let isValid = true;
  const deviceAdapter = sorted[sorted.length - 1] + 3;
  const chain = [...sorted, deviceAdapter].map((item, index) => {
    const prev = index === 0 ? 0 : sorted[index - 1];
    const deviation = item - prev;
    if (deviation > 3) isValid = false;
    return { item, deviation };
  });
  if (!isValid) return null;
  return chain.reduce(
    (acc, curr) => ({
      ...acc,
      [`${curr.deviation}`]: acc[`${curr.deviation}`] + 1,
    }),
    { 1: 0, 2: 0, 3: 0 }
  );
};

const getNext = (item, arr) => {
  return arr.filter((i) => i <= item + 3 && i > item);
};

const doPart1 = (input) => {
  const res = findTheChain(input);
  return res["1"] * res["3"];
};

const last = (input) => input[input.length - 1];

const findTheChainPart2 = (curr, input, stop, register) => {
  if (curr === stop) {
    register.count += 1;
  } else {
    const next = getNext(curr, input);
    if (!next.length) return;
    next.map((item) => findTheChainPart2(item, input, stop, register));
  }
};

const travelInGroup = (input) => {
  const start = input[0];
  const stop = last(input);
  const register = { count: 0 };
  findTheChainPart2(start, input, stop, register);

  return register;
};

const partition = (input) =>
  input.reduce((acc, curr, index) => {
    if (index === 0 || curr - 3 === input[index - 1]) {
      acc.push([curr]);
    } else {
      const lastGroup = last(acc);
      lastGroup.push(curr);
    }
    return acc;
  }, []);

const doPart2 = (input) => {
  const sorted = input.sort((a, b) => a - b);
  const deviceAdapter = sorted[sorted.length - 1] + 3;
  const arr = [0, ...sorted, deviceAdapter];
  const partitioned = partition(arr).filter((arr) => arr.length > 1);
  return partitioned
    .map(travelInGroup)
    .reduce((acc, register) => acc * register.count, 1);
};
console.log(doPart2(data));
