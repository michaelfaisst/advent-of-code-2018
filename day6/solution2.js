const fs = require("fs");

/*
  ------------------------
  SOLUTION s
  ------------------------
*/

/**
 * Parse all points from the input file
 * @param {string} data
 * @returns {{x: number, y: number}[]}
 */
const parsePoints = data => {
  return data.split("\n").map(line => {
    const coords = line.split(",");

    return {
      x: +coords[0],
      y: +coords[1]
    };
  });
};

/**
 * Calculate Area
 * @param {number} maxX
 * @param {number} maxY
 * @param {{x: number, y: number}[]} points
 * @returns {number}
 */
const calculateArea = (maxX, maxY, points) => {
  const map = new Array(maxX + 1)
    .fill(null)
    .map(x => new Array(maxY + 1).fill(null));

  for (const point of points) {
    map[point.x][point.y] = point;
  }

  let count = 0;

  for (let x = 0; x < map.length; ++x) {
    for (let y = 0; y < map[x].length; ++y) {
      let sumDistance = 0;

      for (const point of points) {
        sumDistance += Math.abs(point.x - x) + Math.abs(point.y - y);
      }

      if (sumDistance < 10000) {
        ++count;
      }
    }
  }

  return count;
};

const calculateSolution2 = async () => {
  const data = await fs.readFileAsync("input.txt", "UTF8");
  const points = parsePoints(data);

  const maxX = Math.max(...points.map(point => point.x));
  const maxY = Math.max(...points.map(point => point.y));

  const area = calculateArea(maxX, maxY, points);

  console.log(`Solution 2: ${area}`);
};

module.exports = {
  calculateSolution2
};
