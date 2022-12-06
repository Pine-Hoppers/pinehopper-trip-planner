import axios from 'axios';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_WISHLIST_ITEM = 'SET_WISHLIST_ITEM';
const SET_WISHLIST = 'SET_WISHLIST';
const CREATE_TRIP = 'CREATE_TRIP';

/**
 * ACTION CREATORS
 */
const setWishlistItem = (item) => ({ type: SET_WISHLIST_ITEM, item });

export const setWishlist = (wishlist) => {
  return {
    type: SET_WISHLIST,
    wishlist,
  };
};

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

export const fetchWishlist = (id) => {
  return async (dispatch) => {
    try {
      const userToken = window.localStorage.getItem(TOKEN);
      if (userToken) {
        const { data } = await axios.get(`/api/wishlist?id=${id}`, {
          headers: {
            authorization: userToken,
          },
        });
        dispatch(setWishlist(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case CREATE_TRIP:
      return [];
    case SET_WISHLIST_ITEM:
      return [...state, action.item];
    case SET_WISHLIST:
      return action.wishlist;
    default:
      return state;
  }
}
