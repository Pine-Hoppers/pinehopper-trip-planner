const router = require('express').Router();
const {
  models: { User, Wishlist, Activity },
} = require('../db/index');

// MIDDLEWARE FUNCTION to check for auth headers and attach user to req
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

// POST /api/wishlist
router.post('/', requireToken, async (req, res, next) => {
  try {
    // add activity to Activity table
    const { data } = req.body;

    const additionalCategories = data[0].topics.map((obj) => {
      return JSON.stringify(obj);
    });

    const activity = {
      activity_name: data[0].title,
      url: data[0].url,
      images: [JSON.stringify(data[0].images[0])],
      park_fullName: req.body.parkName,
      park_url: req.body.parkUrl,
      parkCode: req.body.parkCode,
      isReservationRequired: data[0].isReservationRequired,
      feeDescription: data[0].feeDescription,
      doFeesApply: data[0].doFeesApply,
      arePetsPermittedWithRestrictions:
        data[0].arePetsPermittedWithRestrictions,
      petsDescription: data[0].petsDescription,
      activity_category: [JSON.stringify(data[0].activities[0])],
      activityDescription: data[0].activityDescription,
      longDescription: data[0].longDescription,
      additional_category: additionalCategories,
      duration: data[0].duration,
      accessibilityInformation: data[0].accessibilityInformation,
      tags: data[0].tags,
    };

    const newActivity = await Activity.create(activity);

    // if activity is successfully created, add item to Wishlist
    if (newActivity) {
      const newWishlistItem = await Wishlist.create({
        userId: req.user.id,
        activityId: newActivity.id,
      });

      const item = await Wishlist.findByPk(newWishlistItem.id, {
        include: Activity,
      });

      res.status(201).send(item);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
