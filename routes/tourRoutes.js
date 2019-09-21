const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();
// param middleware - checks if id is valid before doing any specific routing(get, patch etc.)
router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkReqBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
