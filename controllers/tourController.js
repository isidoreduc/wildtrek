const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// check for valid id
exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length)
    return res
      .status(404)
      .json({ status: 'fail', message: 'Invalid id bitch' });
  next();
};

// check for not null request body when creating new tour (POST)
exports.checkReqBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res
      .status(400)
      .json({ status: 'fail', message: 'Bad request, bitch' });
  next();
};

// GET
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succes',
    results: tours.length,
    data: { tours }
  });
};

// GET by id
exports.getTourById = (req, res) => {
  // convert from string to number;
  const id = req.params.id * 1;
  const tour = tours.find(t => t.id === id);

  res.status(200).json({
    status: 'succes',
    data: { tour }
  });
  //console.log(req.params);
};

// POST (on file)
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {};

// DELETE
exports.deleteTour = (req, res) => {
  tours = tours.filter(t => t.id !== req.params.id);
  res.status(204).json({ status: 'no content' });
  console.log(tours);
};
