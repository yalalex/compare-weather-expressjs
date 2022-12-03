const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const schedule = require('node-schedule');

const { getCurrent, getDaily } = require('./src/weather');
const dailyRule = require('./src/rules');

const app = express();
const PORT = process.env.PORT || 5000;

schedule.scheduleJob('*/5 * * * *', function () {
  getCurrent();
});
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

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
