const fs = require("fs");

/*
  ------------------------
  SOLUTION 1
  ------------------------
*/

/**
 * Calculate Winning Score
 * @param {number} players
 * @param {number} maxMarble
 * @returns {number}
 */
const calculateWinningScore = (players, maxMarble) => {
    const marbles = [0];
    const scores = new Array(players).fill(0);
    let currentIndex = 0;

    for (let i = 1; i <= maxMarble; ++i) {
        if (i % 23) {
            let newIndex = (currentIndex + 2) % marbles.length;
            if (newIndex === 0) newIndex = marbles.length;

            marbles.splice(newIndex, 0, i);
            currentIndex = newIndex;
        } else {
            const currentPlayer = i % players;
            let marbleIndex = currentIndex - 7;

            if (marbleIndex < 0) marbleIndex = marbles.length + marbleIndex;

            scores[currentPlayer] += i + marbles[marbleIndex];
            marbles.splice(marbleIndex, 1);
            currentIndex = marbleIndex % marbles.length;
        }
    }

    return Math.max(...scores);
};

const calculateSolution1 = async () => {
    const data = await fs.readFileAsync("input.txt", "UTF8");
    const parsedInput = data.match(/[0-9]+/g);

    const score = calculateWinningScore(+parsedInput[0], +parsedInput[1]);
    console.log(`Solution 1: ${score}`);
};

module.exports = {
    calculateSolution1
};
