const fs = require("fs");

/*
  ------------------------
  SOLUTION 1
  ------------------------
*/

/**
 * Calculates an array of all present unique characters in the given string.
 * @param {string} text - The text to get all unique characters from
 * @returns {string[]}
 */
const getUniqueCharacters = (text) => {
  const charMap = {};
  
  for(const char of text) {
    if(!charMap[char]) {
      charMap[char] = true;
    }
  }

  return Object.keys(charMap);
}

/**
 * Checks Box-Id for characters appearing two or three times
 * @param {string} id - Box Id 
 * @returns {{ twoOccured: boolean, threeOccured: boolean }}
 */
const checkId = (id) => {
  let twoOccured = false;
  let threeOccured = false;

  const uniqueCharacters = getUniqueCharacters(id);

  for(const char of uniqueCharacters) {
    const matches = (id.match(new RegExp(char, "g")) || []).length;

    if(matches === 2) twoOccured = true;
    if(matches === 3) threeOccured = true;

    if(twoOccured && threeOccured) {
      return {
        twoOccured,
        threeOccured
      }
    }
  }

  return {
    twoOccured,
    threeOccured
  }
}

/**
 * Calculates Checksum of all Box-Ids
 */
const calculateSolution1 = async () => {
  const data = await fs.readFileAsync("input.txt", "UTF8");
  const lines = data.split("\n");

  let twos = 0;
  let threes = 0;

  for(const line of lines) {
    const result = checkId(line);

    if(result.twoOccured) ++twos;
    if(result.threeOccured) ++threes;
  }

  console.log(`Solution 1: ${twos * threes}`)
}

module.exports = {
  calculateSolution1
}