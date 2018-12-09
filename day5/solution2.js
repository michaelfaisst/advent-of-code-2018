const fs = require("fs");

/*
  ------------------------
  SOLUTION s
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

/**
 * Gets all unique chars from a given string
 * @param {string} text
 */
const getAllCharsUnique = text => {
  const chars = {};

  for (let char of text) {
    if (!chars.hasOwnProperty[char.toLowerCase()]) {
      chars[char.toLowerCase()] = true;
    }
  }

  return Object.keys(chars);
};

const calculateSolution2 = async () => {
  let polymer = await fs.readFileAsync("input.txt", "UTF8");
  let chars = getAllCharsUnique(polymer);
  const reduceResults = {};

  for (let char of chars) {
    const newPolymer = polymer
      .replace(new RegExp(char, "g"), "")
      .replace(new RegExp(char.toUpperCase(), "g"), "");

    let reduceResult = reducePolymer(newPolymer);

    while (reduceResult.triggered) {
      reduceResult = reducePolymer(reduceResult.newPolymer);
    }

    reduceResults[char] = reduceResult.newPolymer.length;
  }

  const minLength = Math.min(...Object.values(reduceResults));
  console.log(`Solution 2: ${minLength}`);
};

module.exports = {
  calculateSolution2
};
