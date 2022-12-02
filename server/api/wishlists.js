const router = require('express').Router();
const {
  models: { Wishlist, Activity },
} = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    console.log('---------------------');
    console.log(req.query);
    console.log('---------------------');
    const wishlists = await Wishlist.findAll({
      where: {
        userId: req.query.id,
      },
    });
    res.json(wishlists);
  } catch (error) {
    next(error);
  }
});

router.get('/:wishlistId', async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findByPk(req.params.wishlistId, {
      include: { model: Activity },
    });
    res.json(wishlist);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
