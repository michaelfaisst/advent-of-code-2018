const fs = require("fs");
const Node = require("./node");

/**
 * Insert a node 2 positions right of the current node
 * @param {Node} startNode
 * @param {Node} insertNode
 */
const insertNodeRight = (startNode, insertNode) => {
    if (startNode.next == null) {
        startNode.next = startNode.prev = insertNode;
        insertNode.prev = insertNode.next = startNode;
        return;
    }

    startNode = startNode.next;
    let tempNode = startNode.next;

    startNode.next = insertNode;
    insertNode.prev = startNode;
    insertNode.next = tempNode;
    tempNode.prev = insertNode;
};

/**
 * Remove node 7 positions left from the current node
 * @param {Node} startNode
 * @returns {{value: number, nextNode: Node}} returns the value of the removed node and the node to the right of the deleted node
 */
const removeNodeLeft = startNode => {
    let removedNode = startNode;
    for (let i = 0; i < 7; i++) {
        removedNode = removedNode.prev;
    }

    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;

    return {
        value: removedNode.value,
        nextNode: removedNode.next
    };
};

/**
 * Calculate Winning Score
 * @param {number} players
 * @param {number} maxMarble
 * @returns {number}
 */
const calculateWinningScore = (players, maxMarble) => {
    let currentNode = new Node(0);
    const scores = new Array(players).fill(0);

    for (let i = 1; i <= maxMarble; ++i) {
        if (i % 23) {
            const newNode = new Node(i);
            insertNodeRight(currentNode, newNode);
            currentNode = newNode;
        } else {
            const currentPlayer = i % players;
            const returnVal = removeNodeLeft(currentNode);
            scores[currentPlayer] += i + returnVal.value;
            currentNode = returnVal.nextNode;
        }
    }

    return Math.max(...scores);
};

/**
 * Calculates the solution of puzzle 1
 */
const calculateSolution1 = async () => {
    const data = await fs.readFileAsync("input.txt", "UTF8");
    const parsedInput = data.match(/[0-9]+/g);

    const score = calculateWinningScore(+parsedInput[0], +parsedInput[1]);
    console.log(`Solution 1: ${score}`);
};

/**
 * Calculates the solution of puzzle 2
 */
const calculateSolution2 = async () => {
    const data = await fs.readFileAsync("input.txt", "UTF8");
    const parsedInput = data.match(/[0-9]+/g);

    const score = calculateWinningScore(+parsedInput[0], +parsedInput[1] * 100);
    console.log(`Solution 2: ${score}`);
};

module.exports = {
    calculateSolution1,
    calculateSolution2
};
