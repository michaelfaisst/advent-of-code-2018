/**
 * Represents a node in tree
 */
class Node {
  /**
   * Creates a new instance of the node class with the given children and metadata count
   * @param {number} childrenCount
   * @param {number} metadataCount
   */
  constructor(childrenCount, metadataCount) {
    this.children = new Array(childrenCount);
    this.metadata = new Array(metadataCount);
  }
}

module.exports = Node;
