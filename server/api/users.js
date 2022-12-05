const express = require('express');
const router = express.Router();
const {
  models: { User },
} = require('../db');
const { requireToken } = require('./gateKeepingMiddleware');

// API/USERS
router.get('/', requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
