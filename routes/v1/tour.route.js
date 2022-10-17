const tourController = require('../../controller/v1/tour.controller.js');
const router = require('express').Router();

router.route('/tours')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router.route('/tours/:id')
  .get(tourController.getOneTourById)
  .patch(tourController.updateById);

router.route('/tour/trending').get(tourController.getTrending);
router.route('/tour/cheapest').get(tourController.getCheapest);

module.exports = router;
