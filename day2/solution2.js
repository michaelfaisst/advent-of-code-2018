const fs = require("fs");

/*
  ------------------------
  SOLUTION 2
  ------------------------
*/

/**
 * Checks if the two given strings differ in only one position
 * @param {string} a
 * @param {string} b
 * @returns {boolean} 
 */
const checkForMatch = (a, b) => {
  let differenceCount = 0;

  for(let i = 0; i < a.length; ++i) {
    if(a[i] !== b[i]) { 
      ++differenceCount;
    }
  }

  return differenceCount === 1;
}

/**
 * Removes the differing characters from the two given strings
 * @param {string} a
 * @param {string} b
 * @returns {string}
 */
const getCommonId = (a, b) => {
  let result = "";

  for(let i = 0; i < a.length; ++i) {
    if(a[i] === b[i]) {
      result += a[i];
    }
  }

  return result;
}

/**
 * Tries to find the two Box-Ids differing at only one character and getting the common letters between them.
 */
const calculateSolution2 = async () => {
  const data = await fs.readFileAsync("input.txt", "UTF8");
  const lines = data.split("\n");

  for(let i = 0; i < lines.length; ++i) {
    const line1 = lines[i];

    for(let j = i + 1; j < lines.length; ++j) {
      const line2 = lines[j];

      let match = checkForMatch(line1, line2);

      if(match) {
        console.log(`Solution 2: ${getCommonId(line1, line2)}`);
      }
    }
  }
};

module.exports = {
  calculateSolution2
};
