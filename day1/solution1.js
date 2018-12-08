let fs = require("fs");

/*
  ------------------------
  SOLUTION 1
  ------------------------
*/

const calculateSolution1 = async () => {
  const data = await fs.readFileAsync("input.txt", "utf8");

  let frequency = 0;
  const lines = data.split("\n");

  for (const line of lines) {
    const change = +line;

    if (!isNaN(change)) {
      frequency += change;
    }
  }

  console.log(`Solution 1: ${frequency}`)
};

module.exports = {
  calculateSolution1
}