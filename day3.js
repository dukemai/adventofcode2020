const data = require("./day3.json").filter(Boolean);
const sample = require("./day3-sample.json").filter(Boolean);

const getBreadthWidth = (map) => map[0].length;

// down 1, right 3
const travel = (map, curr, visited, planStep) => {
  const plannedRow = curr.row + planStep.down;
  const destination = {
    row: plannedRow >= map.length ? map.length - 1 : plannedRow,
    column: (curr.column + planStep.right) % getBreadthWidth(map),
  };
  if (!map[destination.row]) return null;

  const next = [...map[destination.row]][destination.column];
  visited.push(next);
  if (destination.row === map.length - 1) {
    return null;
  }
  return destination;
};

// this time will travel by a plan
const plan = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const doPart1 = (input, planStep = { right: 3, down: 1 }) => {
  let curr = { row: 0, column: 0 };
  const visited = [curr];
  while (curr !== null) {
    curr = travel(input, curr, visited, planStep);
  }
  const treeCount = visited.map((v) => v === "#").filter(Boolean).length;
  return treeCount;
};

const doPart2 = (input) => {
  const total = plan.reduce((acc, planStep) => acc * doPart1(input, planStep), 1);
  return total;
};

console.log(doPart2(data));
