let fs = require("fs");
const util = require("util");
fs.readFileAsync = util.promisify(fs.readFile);

const solution1 = require("./solution1");
solution1.calculateSolution1();