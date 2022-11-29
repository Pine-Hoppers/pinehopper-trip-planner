const { DataTypes } = require('sequelize');
const db = require('../db');

const Wishlist = db.define('wishlist');

module.exports = Wishlist;
