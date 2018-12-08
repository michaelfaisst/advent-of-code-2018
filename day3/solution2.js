const fs = require("fs");

/*
  ------------------------
  SOLUTION 2
  ------------------------
*/

const FABRIC_SIZE = 1000;

/**
 * Creates and initializes the fabric array
 * @returns {number[][]}
 */
const createFabric = () => {
  return new Array(FABRIC_SIZE).fill(0).map(() => new Array(FABRIC_SIZE).fill(0));
}

/**
 * Converts a claim string into an object
 * @param {string} claim 
 */
const convertClaimString = (claim) => {
  const splitClaim = claim.split(/[^\d]+/g);

  return {
    id: +splitClaim[1],
    x: +splitClaim[2],
    y: +splitClaim[3],
    width: +splitClaim[4],
    height: +splitClaim[5]
  }
}

/**
 * Draws a claim into the fabric by incrementing every position of the claim by one
 * @param {number[][]} fabric
 * @param {{ id: number, x: number, y: number, width: number, height: number}} claim 
 */
const drawClaim = (fabric, claim) => {
  for(let i = claim.x; i < (claim.x + claim.width); ++i) {
    for(let j = claim.y; j < (claim.y + claim.height); ++j) {
      ++fabric[j][i];
    }
  }
}

/**
 * Checks if a claim is still intact (has no overlap with any other claim)
 * @param {number[][]} fabric
 * @param {{ id: number, x: number, y: number, width: number, height: number}} claim 
 */
const checkIfIntact = (fabric, claim) => {
  for(let i = claim.x; i < (claim.x + claim.width); ++i) {
    for(let j = claim.y; j < (claim.y + claim.height); ++j) {
      if(fabric[j][i] !== 1) return false;
    }
  }

  return true;
}


/**
 * Counts all overlapped tiles 
 */
const calculateSolution2 = async () => {
  const data = await fs.readFileAsync("input.txt", "UTF8");
  const claims = data.split("\n");
  
  const fabric = createFabric();

  for(const claim of claims) {
    const claimObj = convertClaimString(claim);
    drawClaim(fabric, claimObj);
  }

  let fittingClaim = -1;

  for(const claim of claims) {
    const claimObj = convertClaimString(claim);
    const result = checkIfIntact(fabric, claimObj);

    if(result) {
      fittingClaim = claimObj.id;
      break;
    }
  }

  console.log(`Solution 2: ${fittingClaim}`);

}

module.exports = {
  calculateSolution2
}