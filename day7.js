const data = require("./day7.json");
const sample = require("./day7-sample.json");

// light red bags contain 1 bright white bag, 2 muted yellow bags.
const parseSentence = (sentence) => {
  const [containingBags, objects] = sentence
    .replace(/\.$/, "")
    .split(" contain ");
  const containedBags = objects.split(", ");
  return { containingBags, containedBags };
};

const summary = {};

const doPart1 = (input, bagToFind) => {
  const rules = input.reduce((acc, curr) => {
    const { containingBags, containedBags } = parseSentence(curr);
    acc[containingBags] = containedBags;
    return acc;
  }, {});

  const directlyContainingBags = Object.entries(rules).reduce(
    (acc, [key, value]) => {
      if (value.find((item) => item.match(bagToFind))) {
        acc.add(key);
      }
      return acc;
    },
    new Set()
  );
  const indirectlybags = [...directlyContainingBags].reduce((acc, bag) => {
    doPart1(input, bag.replace(/bags$/, "bag")).forEach((item) =>
      acc.add(item)
    );
    return acc;
  }, new Set());
  summary[bagToFind] = new Set([...directlyContainingBags, ...indirectlybags]);
  return summary[bagToFind];
};

const getNumberOfBags = (bags) =>
  /^\d+/.test(bags) ? +/^\d+/.exec(bags)[0] : 0;

const whatCanBeInTheBagPart2 = (input, bagToFind) => {
  const rules = input.reduce((acc, curr) => {
    const { containingBags, containedBags } = parseSentence(curr);
    acc[containingBags] = containedBags;
    return acc;
  }, {});

  const directlyContainedBags = rules[`${bagToFind}s`];
  if (directlyContainedBags) {
    const total = [...directlyContainedBags].reduce((acc, bag) => {
      return (
        acc +
        getNumberOfBags(bag) +
        getNumberOfBags(bag) *
          (whatCanBeInTheBagPart2(
            input,
            bag.replace(/\d\s/, "").replace(/bags$/, "bag")
          ))
      );
    }, 0);
    summary[bagToFind] = total;
    return summary[bagToFind];
  }
  return 0;
};

const doPart2 = (input, bagToFind) => {
  const result = whatCanBeInTheBagPart2(input, bagToFind);

  return result;
};

console.log(doPart2(data, "shiny gold bag"));
