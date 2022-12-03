const express = require('express');
const router = express.Router();
const {
  models: { User },
} = require('../db');

// MIDDLEWARE FUNC
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

module.exports = { requireToken };
