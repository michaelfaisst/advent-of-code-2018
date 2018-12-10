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
  }

  addSuccessor(node) {
    this.successors.push(node);
  }

  addPredecessors(node) {
    this.predecessors.push(node);
  }
}

module.exports = Node;
