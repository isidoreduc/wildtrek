const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// app.use() to add middleware
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
} // logs a summary of the request - response
app.use(express.json());
// using middleware to serve static files
app.use(express.static(`${__dirname}/public`));
// Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
