import axios from 'axios';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_WISHLIST_ITEM = 'SET_WISHLIST_ITEM';

/**
 * ACTION CREATORS
 */
const setWishlistItem = (item) => ({ type: SET_WISHLIST_ITEM, item });

/**
 * THUNK CREATORS
 */
export const addItemToWishlist = (activityInfo) => {
  return async (dispatch) => {
    try {
      const userToken = window.localStorage.getItem(TOKEN);
      if (userToken) {
        const res = await axios.post('/api/wishlist', activityInfo, {
          headers: {
            authorization: userToken,
          },
        });
        dispatch(setWishlistItem(res.data));
      }
    } catch (error) {
      console.log('Unable to add item to wishlist right now: ', error);
      throw error;
    }
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_WISHLIST_ITEM:
      return [...state, action.item];
    default:
      return state;
  }
}
