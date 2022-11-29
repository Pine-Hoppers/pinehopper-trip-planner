//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Activity = require('./models/Activity');
const Wishlist = require('./models/Wishlist');
const Trip = require('./models/Trip');

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Activity,
    Wishlist,
    Trip,
  },
};
