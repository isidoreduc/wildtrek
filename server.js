const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// path to environment variables config
dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3000;

// mongoose connecection
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connection successfull'));

// server listening for requests
app.listen(port, () => console.log(`app runing on port ${port}...`));
