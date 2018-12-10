const fs = require("fs");

/*
  ------------------------
  SOLUTION 1
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
 * Initialize Map
 * @param {number} maxX
 * @param {number} maxY
 * @param {{x: number, y: number}[]} points
 * @returns {{x: number, y: number}[][]}
 */
const initializeMap = (maxX, maxY, points) => {
  const map = new Array(maxX + 1)
    .fill(null)
    .map(x => new Array(maxY + 1).fill(null));

  for (const point of points) {
    map[point.x][point.y] = point;
  }

  for (let x = 0; x < map.length; ++x) {
    for (let y = 0; y < map[x].length; ++y) {
      let minDistance = maxX + maxY;
      let nearestPoint = null;

      for (const point of points) {
        const distance = Math.abs(point.x - x) + Math.abs(point.y - y);

        if (distance < minDistance) {
          minDistance = distance;
          nearestPoint = point;
        } else if (distance === minDistance) {
          minDistance = distance;
          nearestPoint = null;
        }
      }

      map[x][y] = nearestPoint;
    }
  }

  return map;
};

/**
 * Calculates the largest finite area
 * @param {{x: number, y: number}[][]} map
 * @param {{x: number, y: number}[]} points
 */
const calculateLargestArea = (map, points) => {
  for (let x = 0; x < map.length; ++x) {
    const maxY = map[x].length - 1;

    const edgeIndex1 = points.indexOf(map[x][0]);
    const edgeIndex2 = points.indexOf(map[x][maxY]);

    if (edgeIndex1 > -1) points.splice(edgeIndex1, 1);
    if (edgeIndex2 > -1) points.splice(edgeIndex2, 1);
  }

  for (let y = 0; y < map[0].length; ++y) {
    const maxX = map.length - 1;

    const edgeIndex1 = points.indexOf(map[0][y]);
    const edgeIndex2 = points.indexOf(map[maxX][y]);

    if (edgeIndex1 > -1) points.splice(edgeIndex1, 1);
    if (edgeIndex2 > -1) points.splice(edgeIndex2, 1);
  }

  let maxArea = -1;

  for (const point of points) {
    const area = map.reduce((count, row) => {
      return count + row.filter(coord => coord === point).length;
    }, 0);

    if (area > maxArea) {
      maxArea = area;
    }
  }

  return maxArea;
};

const calculateSolution1 = async () => {
  const data = await fs.readFileAsync("input.txt", "UTF8");
  const points = parsePoints(data);

  const maxX = Math.max(...points.map(point => point.x));
  const maxY = Math.max(...points.map(point => point.y));

  const map = initializeMap(maxX, maxY, points);
  const area = calculateLargestArea(map, points);

  console.log(`Solution 1: ${area}`);
};

module.exports = {
  calculateSolution1
};
