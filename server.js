const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const schedule = require('node-schedule');
const { getCurrent, getDaily } = require('./src/weather');

const app = express();

// getCurrent();

schedule.scheduleJob('*/5 * * * *', function () {
  getCurrent();
});

const dailyRule = new schedule.RecurrenceRule();
dailyRule.hour = [2, 5, 8, 11, 14, 17, 20, 23];
dailyRule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
schedule.scheduleJob(dailyRule, function () {
  getDaily();
});

app.use(
  express.json({
    extended: false,
  })
);

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://compare-weather.onrender.com'],
    credentials: true,
  })
);

app.use('/api', require('./src/routes'));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
