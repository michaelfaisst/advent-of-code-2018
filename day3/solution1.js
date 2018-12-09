const fs = require("fs");

/*
  ------------------------
  SOLUTION 1
  ------------------------
*/

const FABRIC_SIZE = 1000;

/**
 * Creates and initializes the fabric array
 * @returns {number[][]}
 */
const createFabric = () => {
  return new Array(FABRIC_SIZE)
    .fill(0)
    .map(() => new Array(FABRIC_SIZE).fill(0));
};

/**
 * Converts a claim string into an object
 * @param {string} claim
 */
const convertClaimString = claim => {
  const splitClaim = claim.split(/[^\d]+/g);

  return {
    id: +splitClaim[1],
    x: +splitClaim[2],
    y: +splitClaim[3],
    width: +splitClaim[4],
    height: +splitClaim[5]
  };
};

/**
 * Draws a claim into the fabric by incrementing every position of the claim by one
 * @param {number[][]} fabric
 * @param {string} claim
 */
const drawClaim = (fabric, claim) => {
  claim = convertClaimString(claim);

  for (let i = claim.x; i < claim.x + claim.width; ++i) {
    for (let j = claim.y; j < claim.y + claim.height; ++j) {
      ++fabric[j][i];
    }
  }
};

/**
 * Checks the fabric for overlaps
 * @param {number[][]} fabric
 */
const countOverlaps = fabric => {
  return fabric.reduce((acc, value) => {
    return acc + value.filter(x => x > 1).length;
  }, 0);
};

/**
 * Counts all overlapped tiles
 */
const calculateSolution1 = async () => {
  const data = await fs.readFileAsync("input.txt", "UTF8");
  const claims = data.split("\n");

  const fabric = createFabric();

  for (const claim of claims) {
    drawClaim(fabric, claim);
  }

  const overlaps = countOverlaps(fabric);
  console.log(`Solution 1: ${overlaps}`);
};

module.exports = {
  calculateSolution1
};
