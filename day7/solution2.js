const fs = require("fs");
const Node = require("./node");

/*
  ------------------------
  SOLUTION 2
  ------------------------
*/

/**
 * Parses all input lines into a dependency graph
 * @param {string[]} lines
 */
const parseLines = lines => {
  const nodes = [];

  for (const line of lines) {
    let matches = [line[5], line[36]];

    const connectedNodes = matches.map(match => {
      let node = nodes.find(x => x.name === match.trim());

      if (node == null) {
        node = new Node(match.trim());
        nodes.push(node);
      }

      return node;
    });

    connectedNodes[0].addSuccessor(connectedNodes[1]);
    connectedNodes[1].addPredecessors(connectedNodes[0]);
  }

  return nodes;
};

/**
 *
 * @param {Node[]} startingNodes
 */
const processGraph = (startingNodes, workerCount) => {
  let nodesToProcess = [...startingNodes];
  let nodeOrder = "";
  let time = 0;

  while (nodesToProcess.length > 0) {
    nodesToProcess.sort((node1, node2) => node1.name.localeCompare(node2.name));

    for (let i = 0; i < nodesToProcess.length; ++i) {
      const node = nodesToProcess[i];

      if (node.predecessors.length > 0) {
        continue;
      }

      if (node.workedOn) {
        if (node.timeToProcess > 0) {
          --node.timeToProcess;
          continue;
        } else {
          for (let successor of node.successors) {
            const indexOfNode = successor.predecessors.indexOf(node);

            if (indexOfNode > -1) {
              successor.predecessors.splice(indexOfNode, 1);
            }

            if (
              !nodesToProcess.includes(successor) &&
              successor.predecessors.length === 0
            ) {
              nodesToProcess.push(successor);
            }
          }

          ++workerCount;
          let nodeIndex = nodesToProcess.indexOf(node);
          nodesToProcess.splice(nodeIndex, 1);
          --i;
          nodeOrder += node.name;
        }
      } else if (!node.workedOn && workerCount > 0) {
        node.workedOn = true;
        --node.timeToProcess;
        --workerCount;
      }
    }

    ++time;
  }

  return time - 1;
};

const calculateSolution2 = async () => {
  const data = await fs.readFileAsync("input.txt", "UTF8");
  const lines = data.split("\n");

  const graph = parseLines(lines);
  const startingNodes = graph.filter(x => x.predecessors.length === 0);

  const timeToFinish = processGraph(startingNodes, 5);
  console.log(`Solution 2: ${timeToFinish} seconds`);
};

module.exports = {
  calculateSolution2
};
