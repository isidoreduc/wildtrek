const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// app.use() to add middleware
app.use(morgan('dev')); // show a summary of the request - response
app.use(express.json());
// app.use((req, res, next) => {
//   console.log('hello from middleware');
//   next();
// });

// Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
