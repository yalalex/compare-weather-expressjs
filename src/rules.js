const schedule = require('node-schedule');

const dailyRule = new schedule.RecurrenceRule();
dailyRule.hour = [2, 5, 8, 11, 14, 17, 20, 23];
dailyRule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

module.exports = dailyRule;
