let fs = require("fs");

/*
  ------------------------
  SOLUTION 2
  ------------------------
*/

const calculateSolution2 = async () => {
  const data = await fs.readFileAsync("input.txt", "utf8");
  let frequency = 0;
  let duplicateFound = false;

  const reachedFrequency = {
    "0": true
  };

  const lines = data.split("\n");

  while (!duplicateFound) {
    for (const line of lines) {
      const change = +line;

      if (!isNaN(change)) {
        frequency += change;

        if (reachedFrequency[frequency] === true) {
          duplicateFound = true;
          break;
        } else {
          reachedFrequency[frequency] = true;
        }
      }
    }
  }

  console.log(`Solution 2: ${frequency}`)
};

module.exports = {
  calculateSolution2
}