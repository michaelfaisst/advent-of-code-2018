const fs = require("fs");

/*
  ------------------------
  SOLUTION 2
  ------------------------
*/

/**
 * Creates shiftlogs (log for every night)
 * @param {string[]} entries
 */
const createShiftLogs = entries => {
  const log = [];
  let currentShift;

  for (const entry of entries) {
    if (entry.match(/Guard/)) {
      if (currentShift) {
        log.push(currentShift);
      }

      currentShift = {
        guardId: entry.match(/#(\d+)/)[1],
        minutes: new Array(60).fill(false)
      };
    }

    const minute = entry.match(/:(\d{2})]/)[1];
    currentShift.minutes.fill(entry.match(/falls asleep/) != null, minute);
  }

  log.push(currentShift);
  return log;
};

/**
 * Finds the sleepiest minute for each guard
 * @param {{guardId: string, minutes: boolean[]}[]} shiftLogs
 * @returns {{guardId: number, minute: number, timesAsleep: number}[]}
 */
const findSleepiestMinutes = shiftLogs => {
  minuteTrackers = {};

  for (let shift of shiftLogs) {
    if (!minuteTrackers[shift.guardId]) {
      minuteTrackers[shift.guardId] = new Array(60).fill(0);
    }

    for (let i = 0; i < 60; ++i) {
      minuteTrackers[shift.guardId][i] += shift.minutes[i];
    }
  }

  return Object.keys(minuteTrackers).map(guardId => {
    const mostAsleepMinute = minuteTrackers[guardId].indexOf(
      Math.max(...minuteTrackers[guardId])
    );

    return {
      guardId: +guardId,
      minute: mostAsleepMinute,
      timesAsleep: minuteTrackers[guardId][mostAsleepMinute]
    };
  });
};

const calculateSolution2 = async () => {
  const data = await fs.readFileAsync("input.txt", "UTF8");
  const entries = data.split("\n").sort();

  const shiftLogs = createShiftLogs(entries);
  const sleepiestMinutes = findSleepiestMinutes(shiftLogs);

  let maxEntry = sleepiestMinutes[0];
  for (let entry of sleepiestMinutes) {
    if (entry.timesAsleep > maxEntry.timesAsleep) {
      maxEntry = entry;
    }
  }

  console.log(`Solution 2: ${maxEntry.guardId * maxEntry.minute}`);
};

module.exports = {
  calculateSolution2
};
