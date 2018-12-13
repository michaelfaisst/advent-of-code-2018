const fs = require("fs");

/*
  ------------------------
  SOLUTION 1
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

    for (let i = 0; i < childCount; i++) {
        metadataSum = parseNode(inputArray, metadataSum);
    }

    for (let i = 0; i < metadataCount; i++) {
        metadataSum += inputArray[i];
    }

    inputArray.splice(0, metadataCount);
    return metadataSum;
};

const calculateSolution1 = async () => {
    const data = await fs.readFileAsync("input.txt", "UTF8");
    const inputArray = data.split(" ").map(x => +x);

    const metadataCount = parseNode(inputArray, 0);
    console.log(`Solution 1: ${metadataCount}`);
};

module.exports = {
    calculateSolution1
};
