const router = require('express').Router();
const {
  models: { Trip, Activity },
} = require('../db/index');
const requireToken = require('./users');

router.get('/', requireToken, async (req, res, next) => {
  try {
    const allTrips = await Trip.findAll();
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
    res.status(201).send(await Trip.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:tripId', requireToken, async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId, {
      include: { model: Activity },
    });
    res.send(await trip.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:tripId', requireToken, async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId);
    await trip.destroy();
    res.send(trip);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
