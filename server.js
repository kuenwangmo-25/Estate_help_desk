const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// Database connection setup
const DB = process.env.DATABASE.replace('PASSWORD', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con) => {
    console.log('DB connection successful');
  })
  .catch((error) => {
    console.error('DB connection error:', error);
  });

const port = 4001;

app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});
