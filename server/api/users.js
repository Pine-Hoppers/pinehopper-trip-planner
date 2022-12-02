const express = require('express');
const router = express.Router();
const {
  models: { User },
} = require('../db');

// MIDDLEWARE
router.use(express.json());

// MIDDLEWARE FUNC
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log('--------> TOKEN', token);

    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

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

module.exports = { router, requireToken };
