const fs = require("fs");
const Node = require("./node");

/*
  ------------------------
  SOLUTION 1
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

const processGraph = startingNodes => {
  let nodesToProcess = [...startingNodes];
  let nodeOrder = "";

  while (nodesToProcess.length > 0) {
    nodesToProcess.sort((node1, node2) => node1.name.localeCompare(node2.name));

    for (const node of nodesToProcess) {
      if (node.predecessors.length > 0) {
        continue;
      }

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

      let nodeIndex = nodesToProcess.indexOf(node);
      nodesToProcess.splice(nodeIndex, 1);

      nodeOrder += node.name;
      break;
    }
  }

  return nodeOrder;
};

const calculateSolution1 = async () => {
  const data = await fs.readFileAsync("input.txt", "UTF8");
  const lines = data.split("\n");

  const graph = parseLines(lines);
  const startingNodes = graph.filter(x => x.predecessors.length === 0);

  const nodeOrder = processGraph(startingNodes);
  console.log(`Solution 2: ${nodeOrder}`);
};

module.exports = {
  calculateSolution1
};
