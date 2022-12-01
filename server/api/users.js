const express = require('express');
const router = express.Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

// Middleware
router.use(express.json());

// Middleware func to check for auth headers and attach user to req
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
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
