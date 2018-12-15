const fs = require("fs");

/**
 * Parses all given lines and creates points out of it
 * @param {string[]} lines
 * @returns {{x: number, y: number, deltaX: number, deltaY: number}[]}
 */
const parsePoints = lines => {
  return lines.map(line => {
    const parsedLine = line.match(/(-?\d+)/g);

    return {
      x: +parsedLine[0],
      y: +parsedLine[1],
      deltaX: +parsedLine[2],
      deltaY: +parsedLine[3]
    };
  });
};

/**
 * Calculates a iteration of star movement
 * @param {{x: number, y: number, deltaX: number, deltaY: number}[]} points
 */
const calculateIteration = (points, forward = true) => {
  for (const point of points) {
    point.x = forward ? point.x + point.deltaX : point.x - point.deltaX;
    point.y = forward ? point.y + point.deltaY : point.y - point.deltaY;
  }

  return (
    Math.max(...points.map(point => point.x)) +
    Math.abs(Math.min(...points.map(point => point.x)))
  );
};

/**
 * Prints a star constalation to the console
 * @param {{x: number, y: number, deltaX: number, deltaY: number}[]} points
 */
const print = points => {
  const minX = Math.min(...points.map(point => point.x));
  const maxX = Math.max(...points.map(point => point.x));
  const minY = Math.min(...points.map(point => point.y));
  const maxY = Math.max(...points.map(point => point.y));

  for (let y = minY; y <= maxY; ++y) {
    let line = "";
    for (let x = minX; x <= maxX; ++x) {
      const point = points.find(point => point.x === x && point.y === y);
      line += point == null ? "." : "#";
    }

    console.log(line);
  }
};

const calculateSolution = async (iterations = 100) => {
  const data = await fs.readFileAsync("input.txt", "UTF8");
  const points = parsePoints(data.split("\n"));

  let lastHeight;
  let currentHeight = Infinity;
  let seconds = 0;

  do {
    lastHeight = currentHeight;
    currentHeight = calculateIteration(points);
    ++seconds;
  } while (lastHeight >= currentHeight);

  calculateIteration(points, false);

  console.log("Solution 1:");
  print(points);
  console.log("---------------------------");

  console.log(`Solution 2: ${seconds - 1}`);
};

module.exports = {
  calculateSolution
};
