const data = require("./day8.json");
const sample = require("./day8-sample.json");

const performSingleRow = (cmdIndex, commandList, register) => {
  const cmd = commandList[cmdIndex];
  if (!cmd) return register;

  const [command, rowNum] = cmd.split(" ");
  if (register.done.has(cmdIndex)) return register;
  register.done.add(cmdIndex);

  switch (command) {
    case "nop":
      return performSingleRow(cmdIndex + 1, commandList, register);

    case "acc":
      register.acc += +rowNum;
      return performSingleRow(cmdIndex + 1, commandList, register);

    case "jmp":
      return performSingleRow(cmdIndex + +rowNum, commandList, register);
  }
  return register;
};

const doPart1 = (input) => {
  return performSingleRow(0, input, { done: new Set(), acc: 0 });
};

const isProperlyTerminate = (register, commandList) => {
  const done = [...register.done];
  return done[done.length - 1] === commandList.length - 1;
};

const changeCommand = (cmd) =>
  cmd.includes("nop") ? cmd.replace("nop", "jmp") : cmd.replace("jmp", "nop");

const doPart2 = (input) => {
  const possibleWrongCommands = input
    .map((cmd, index) => {
      if (!/(nop|jmp)/.test(cmd)) return null;
      const arr = [...input];
      arr.splice(index, 1, changeCommand(cmd));
      return arr;
    })
    .filter(Boolean);
  return possibleWrongCommands.reduce((acc, curr) => {
    if (acc) return acc;
    const register = performSingleRow(0, curr, { done: new Set(), acc: 0 });
    return isProperlyTerminate(register, curr) ? register : null;
  }, null);
};
console.log(doPart2(data));
