const router = require('express').Router();
const {
  models: { Trip, Activity },
} = require('../db/index');
const { requireToken } = require('./gateKeepingMiddleware');

router.get('/', requireToken, async (req, res, next) => {
  try {
    const allTrips = await Trip.findAll({
      where: {
        userId: req.query.id,
      },
      include: { model: Activity },
    });
    res.json(allTrips);
  } catch (error) {
    next(error);
  }
});

router.get('/:tripId', requireToken, async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId, {
      include: { model: Activity },
    });
    res.json(trip);
  } catch (error) {
    next(error);
  }
});

router.post('/', requireToken, async (req, res, next) => {
  try {
    const trip = await Trip.create({
      tripName: req.body.tripName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      userId: req.body.userId,
    });

    req.body.activities.map(async (activity) => {
      let activityRow = await Activity.findByPk(activity.activityId);
      await activityRow.update({
        tripId: trip.id,
        dateOfActivity: activity.dateOfActivity,
      });
    });
    res.status(201).send(trip);
  } catch (error) {
    next(error);
  }
});

router.put('/:tripId', requireToken, async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId);

    await trip.update({
      tripName: req.body.tripName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    req.body.removedActivities.map(async (activity) => {
      let activityRow = await Activity.findByPk(activity.id);
      await activityRow.update({
        tripId: null,
        dateOfActivity: null,
      });
    });

    req.body.activities.map(async (activity) => {
      let activityRow = await Activity.findByPk(activity.activityId);

      await activityRow.update({
        tripId: trip.id,
        dateOfActivity: activity.dateOfActivity,
      });
    });
    res.send(trip);
  } catch (error) {
    next(error);
  }
});

router.delete('/:tripId', requireToken, async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId, {
      include: { model: Activity },
    });
    await trip.destroy();
    res.send(trip);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
