const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// app.use() to add middleware
app.use(express.json());

// GET
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succes',
    results: tours.length,
    data: { tours }
  });
};

// GET by id
const getTourById = (req, res) => {
  // convert from string to number;
  const id = req.params.id * 1;
  const tour = tours.find(t => t.id === id);
  if (!tour)
    return res.status(404).json({ status: 'fail', message: 'Invalid id' });
  res.status(200).json({
    status: 'succes',
    data: { tour }
  });
  //console.log(req.params);
};

// POST (on file)
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'succes',
        data: { tour: newTour }
      });
    }
  );
};

// PATCH
const updateTour = (req, res) => {};

// DELETE
const deleteTour = (req, res) => {
  tours = tours.filter(t => t.id !== req.params.id);
  res.status(204).json({ status: 'no content' });
  console.log(tours);
};

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

// server listening for requests
app.listen(port, () => console.log(`app runing on port ${port}...`));
