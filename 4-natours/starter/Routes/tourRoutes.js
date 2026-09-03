const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');
const router = express.Router();




   // POST /tour/:tourId/reviews   
//GET /tour/:tourId/reviews




// in this we can get reviewRouter from this in tourRoutes 
router.use('/:tourId/reviews',reviewRouter);



router
.route('/top-5-cheap')
.get(tourController.aliasTopTours,tourController.getAllTours);

router
.route('/tour-stats')
.get(tourController.getTourStats);

router
.route('/monthly-plan/:year')
.get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post( tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(authController.protect,
    authController.restrictTo('admin','lead-guide'),
     tourController.deleteTour);





module.exports = router;
