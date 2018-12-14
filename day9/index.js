const fs = require("fs");
const util = require("util");
fs.readFileAsync = util.promisify(fs.readFile);

const solution = require("./solution");
solution.calculateSolution1();
solution.calculateSolution2();
