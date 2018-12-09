const fs = require("fs");

/*
  ------------------------
  SOLUTION 1
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
 * Find the most sleepy guard
 * @param {{guardId: string, minutes: boolean[]}[]} shiftLogs
 * @returns { string } guard id
 */
const findMostSleepyGuard = shiftLogs => {
  const minutesPerGuard = {};
  let currentMaxMinutes = -1;
  let sleepiestGuard = "";

  for (const log of shiftLogs) {
    minutesPerGuard[log.guardId] =
      (minutesPerGuard[log.guardId] || 0) + log.minutes.filter(x => x).length;

    if (minutesPerGuard[log.guardId] > currentMaxMinutes) {
      currentMaxMinutes = minutesPerGuard[log.guardId];
      sleepiestGuard = log.guardId;
    }
  }

  return sleepiestGuard;
};

/**
 * Finds the sleepiest minute for a given guard
 * @param {{guardId: string, minutes: boolean[]}[]} shiftLogs
 * @param {string} guardId
 * @returns {number}
 */
const findSleepiestMinute = (shiftLogs, guardId) => {
  const logsForGuard = shiftLogs.filter(x => x.guardId === guardId);
  const minuteTracker = new Array(60).fill(0);

  for (let i = 0; i < 60; ++i) {
    for (const log of logsForGuard) {
      minuteTracker[i] += log.minutes[i];
    }
  }

  return minuteTracker.indexOf(Math.max(...minuteTracker));
};

const calculateSolution1 = async () => {
  const data = await fs.readFileAsync("input.txt", "UTF8");
  const entries = data.split("\n").sort();

  const shiftLogs = createShiftLogs(entries);
  const guardId = findMostSleepyGuard(shiftLogs);
  const sleepiestMinute = findSleepiestMinute(shiftLogs, guardId);

  console.log(`Solution 1: ${+guardId * sleepiestMinute}`);
};

module.exports = {
  calculateSolution1
};
