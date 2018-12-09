const fs = require("fs");

/*
  ------------------------
  SOLUTION 1
  ------------------------
*/

/**
 * Moves the given char in the ascii table by the given range
 * @param {string} char
 * @param {number} change
 */
const changeCharCode = (char, change) => {
  return String.fromCharCode(char.charCodeAt(0) + change);
};

/**
 * Iterates through the polymer and removes all current triggers
 * @param {string} polymer
 */
const reducePolymer = polymer => {
  const chars = polymer.split("");
  let triggered = false;

  for (let i = chars.length - 1; i > 0; i--) {
    const isLowerCase = polymer[i] === polymer[i].toLowerCase();

    if (
      (isLowerCase && polymer[i] === changeCharCode(polymer[i - 1], 32)) ||
      (!isLowerCase && polymer[i] === changeCharCode(polymer[i - 1], -32))
    ) {
      chars.splice(i - 1, 2);
      i -= 2;
      triggered = true;
    }
  }

  return {
    triggered,
    newPolymer: chars.join("")
  };
};

const calculateSolution1 = async () => {
  let polymer = await fs.readFileAsync("input.txt", "UTF8");

  let reduceResult = reducePolymer(polymer);

  while (reduceResult.triggered) {
    reduceResult = reducePolymer(reduceResult.newPolymer);
  }

  console.log(reduceResult.newPolymer.length);
};

module.exports = {
  calculateSolution1
};
