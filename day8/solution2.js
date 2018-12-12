const fs = require("fs");
const Node = require("./node");

/*
  ------------------------
  SOLUTION 2
  ------------------------
*/

/**
 * Parses one node of the tree
 * @param {number[]} inputArray
 */
const parseNode = (inputArray, metadataSum) => {
  const childCount = inputArray[0];
  const metadataCount = inputArray[1];
  inputArray.splice(0, 2);

  let nodeValue = 0;
  const childNodeValues = [];

  for (let i = 0; i < childCount; i++) {
    childNodeValues[i] = parseNode(inputArray, metadataSum);
  }

  for (let i = 0; i < metadataCount; i++) {
    nodeValue +=
      childCount === 0
        ? inputArray[i]
        : childNodeValues[inputArray[i] - 1] || 0;
  }

  inputArray.splice(0, metadataCount);
  return nodeValue;
};

const calculateSolution2 = async () => {
  const data = await fs.readFileAsync("input.txt", "UTF8");
  const inputArray = data.split(" ").map(x => +x);

  const metadataCount = parseNode(inputArray, 0);
  console.log(`Solution 1: ${metadataCount}`);
};

module.exports = {
  calculateSolution2
};
