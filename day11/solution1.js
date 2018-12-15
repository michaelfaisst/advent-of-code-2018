const fs = require("fs");

/**
 * Calculates the power level for a single cell
 * @param {number} x
 * @param {number} y
 * @param {number} serialNumber
 * @returns {number}
 */
const calculatePowerLevel = (x, y, serialNumber) => {
  const rackId = x + 10;
  let powerLevel = (rackId * y + serialNumber) * rackId;
  powerLevel = powerLevel > 100 ? parseInt((powerLevel / 100) % 10) : 0;
  powerLevel -= 5;

  return powerLevel;
};

/**
 * Initializes a fuel grid with power levels
 * @param {number} size
 * @param {number} serialNumber
 * @returns {number[][]}
 */
const initializeFuelGrid = (size, serialNumber) => {
  const fuelGrid = new Array(size)
    .fill(null)
    .map(column => new Array(size).fill(0));

  for (let x = 0; x < size; ++x) {
    for (let y = 0; y < size; ++y) {
      fuelGrid[x][y] = calculatePowerLevel(x + 1, y + 1, serialNumber);
    }
  }

  return fuelGrid;
};

/**
 * Calculates the power level of a 3x3 subgrid starting at x and y
 * @param {number[][]} fuelGrid
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
const calculateSubGridLevel = (fuelGrid, x, y) => {
  let sum = 0;

  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      sum += fuelGrid[x + i][y + j];
    }
  }

  return sum;
};

/**
 * Calculates the position of the 3x3 square with the largest power value
 * @param {number[][]} fuelGrid
 * @returns {{x: number, y: number}}
 */
const getMaxPowerGridPosition = fuelGrid => {
  let maxPowerLevel = -Infinity;
  let maxPowerPosition;

  for (let x = 0; x < fuelGrid.length - 2; ++x) {
    for (let y = 0; y < fuelGrid[x].length - 2; ++y) {
      let powerLevel = calculateSubGridLevel(fuelGrid, x, y);

      if (powerLevel > maxPowerLevel) {
        maxPowerLevel = powerLevel;
        maxPowerPosition = { x, y };
      }
    }
  }

  return maxPowerPosition;
};

/**
 * Calculation solution of puzzle 1
 */
const calculateSolution1 = () => {
  const serialNumber = 1308;

  const fuelGrid = initializeFuelGrid(300, serialNumber);
  const maxGridPos = getMaxPowerGridPosition(fuelGrid);
  console.log(`Solution 1: ${maxGridPos.x + 1}, ${maxGridPos.y + 1}`);
};

module.exports = {
  calculateSolution1
};
