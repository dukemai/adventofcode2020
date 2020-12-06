const data = require("./day3.json").filter(Boolean);

const getBreadthWidth = (map) => map[0].length;

// down 1, right 3
const travel = (map, curr, visited) => {
  const destination = {
    row: curr.row + 1,
    column: (curr.column + 3) % getBreadthWidth(map),
  };
  if(!map[destination.row]) return null;

  const next = [...map[destination.row]][destination.column];
  visited.push(next);
  if (destination.row === map.length) {
    return null;
  }
  return destination;
};

const doPart1 = (input) => {
  let curr = { row: 0, column: 0 };
  const visited = [curr];
  while (curr !== null) {
    curr = travel(input, curr, visited);
  }
  const treeCount = visited.map(v => v ==='#').filter(Boolean).length;
  return treeCount;
};

console.log(doPart1(data));