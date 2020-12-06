const data = require("./day4.json");
const sample = require("./day4-sample.json");

const last = (acc) => acc[acc.length - 1];

const isValidPassport = (passport) => {
  console.log(passport);
  return (
    passport.byr &&
    passport.iyr &&
    passport.eyr &&
    passport.hgt &&
    passport.hcl &&
    passport.ecl &&
    passport.pid
  );
};

const validateHeight = (height) => {
  if (!height.includes("cm") && !height.includes("in")) return false;
  const [lower, upper] = height.includes("cm") ? [150, 193] : [59, 76];
  const value = +height.replace("cm", "").replace("in", "");
  return value >= lower && value <= upper;
};

const isValidPassportPart2 = (passport) => {
  const valid = (
    passport.byr &&
    passport.byr.length === 4 &&
    +passport.byr >= 1920 &&
    +passport.byr <= 2002 &&
    passport.iyr &&
    passport.iyr.length === 4 &&
    +passport.iyr >= 2010 &&
    +passport.iyr <= 2020 &&
    passport.eyr &&
    passport.eyr.length === 4 &&
    +passport.eyr >= 2020 &&
    +passport.eyr <= 2030 &&
    passport.hgt &&
    validateHeight(passport.hgt) &&
    /#[\d\w]{6}/.test(passport.hcl) && 
    passport.hcl.length === 7 &&
    passport.ecl &&
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(passport.ecl) &&
    /\d{9}/.test(passport.pid)
    && passport.pid.length === 9 
  );
  return valid;
};

const parseToPassport = (input) =>
  input.reduce((acc, row, index) => {
    if (row === "" || index === 0) {
      acc.push({});
    }

    const currentPassport = last(acc) || {};

    const attributes = row.split(" ");
    attributes.forEach((attribute) => {
      const [key, value] = attribute.split(":");
      if (key) currentPassport[key] = value;
    });

    acc[acc.length - 1] = currentPassport;
    return acc;
  }, []);

const doPart1 = (input) => {
  const total = parseToPassport(input).reduce(
    (acc, passport) => (isValidPassport(passport) ? acc + 1 : acc),
    0
  );
  return total;
};

const doPart2 = (input) => {
  const total = parseToPassport(input).reduce(
    (acc, passport) => (isValidPassportPart2(passport) ? acc + 1 : acc),
    0
  );
  return total;
};

console.log(doPart2(data));
