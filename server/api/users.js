const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // Explicitly select only the id and username fields - even though users' passwords are encrypted, it won't help if we just send everything to anyone who asks.
      attributes: ['id', 'username'],

      //~~~~> GRACESHOPPER DID BELOW. ANY REASON ONLY ID AND USERNAME IS BEST? NOT SURE WHAT THIS IS DOING REALLY.
      // attributes: ["id", "username", "firstName", "lastName", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
