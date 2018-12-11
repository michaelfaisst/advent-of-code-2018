/**
 * Class representing on Node of the dependency graph
 */
class Node {
  /**
   * Creates a new instance of the Node class
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
    this.successors = [];
    this.predecessors = [];
    this.timeToProcess = 60 + this.name.charCodeAt(0) - 64;
    this.workedOn = false;
  }

  addSuccessor(node) {
    this.successors.push(node);
  }

  addPredecessors(node) {
    this.predecessors.push(node);
  }
}

module.exports = Node;
