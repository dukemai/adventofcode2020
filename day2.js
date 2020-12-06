const data = require("./day2-part1.json");

const isSatisfied = (input) => {
  const [rule, password] = input.split(":");
  const [numbers, character] = rule.split(" ");
  const [lower, upper] = numbers.split("-");
  const onlyCharacterPassword = password.replace(
    new RegExp(`[^${character}]`, "g"),
    ""
  );
  return (
    onlyCharacterPassword.length <= +upper &&
    onlyCharacterPassword.length >= +lower
  );
};

const isSatisfiedPart2 = (input) => {
  const [rule, password] = input.split(": ");
  const [numbers, character] = rule.split(" ");
  const [lower, upper] = numbers.split("-");
  
  return (
    (password[+lower - 1] === character) ^ (password[+upper - 1] === character)
  );
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
  return input.reduce((acc, curr) => {
    return (acc = acc + (isSatisfiedPart2(curr) ? 1 : 0));
  }, 0);
};

console.log(playPart2(data));
