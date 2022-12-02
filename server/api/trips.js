const router = require('express').Router();
const {
  models: { Trip, Activity },
} = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    const allTrips = await Trip.findAll({
      where: {
        userId: req.query.id,
      },
    });
    res.json(allTrips);
  } catch (error) {
    next(error);
  }
});

router.get('/:tripId', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId, {
      include: { model: Activity },
    });
    res.json(trip);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Trip.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:tripId', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId, {
      include: { model: Activity },
    });
    res.send(await trip.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:tripId', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId);
    await trip.destroy();
    res.send(trip);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
