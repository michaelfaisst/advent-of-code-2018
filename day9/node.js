/**
 * Node of a linked list
 */
class Node {
    /**
     * Initializes a new Node instance with a given value
     * @param {number} value
     */
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

module.exports = Node;
