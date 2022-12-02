const express = require('express');
const router = express.Router();
const {
  models: { User },
} = require('../db');
const { requireToken } = require('./gateKeepingMiddleware');

// API/GET/
router.get('/', requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // Explicitly select only the id and username fields - even though users' passwords are encrypted, it won't help if we just send everything to anyone who asks.
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = { router };
