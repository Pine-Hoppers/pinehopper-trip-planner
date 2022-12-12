import axios from 'axios';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_WISHLIST_ITEM = 'SET_WISHLIST_ITEM';
const RM_WISHLIST_ITEM = 'RM_WISHLIST_ITEM';
const SET_WISHLIST = 'SET_WISHLIST';
const CREATE_TRIP = 'CREATE_TRIP';
const DRAG_ACTIVITY = 'DRAG_ACTIVITY';
const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';

/**
 * ACTION CREATORS
 */
const setWishlistItem = (item) => ({ type: SET_WISHLIST_ITEM, item });

const removeWishlistItem = (removedItem) => ({
  type: RM_WISHLIST_ITEM,
  removedItem,
});

const dragActivity = (activity) => ({
  type: DRAG_ACTIVITY,
  activity,
});

const removeActivity = (item) => ({
  type: REMOVE_ACTIVITY,
  item,
});

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

export const removeItemFromWishlist = (itemId) => {
  return async (dispatch) => {
    try {
      const userToken = window.localStorage.getItem(TOKEN);
      if (userToken) {
        const res = await axios.delete(`/api/wishlist/${itemId}`, {
          headers: {
            authorization: userToken,
          },
        });
        dispatch(removeWishlistItem(res.data));
      }
    } catch (error) {
      console.log('Unable to remove item from wishlist right now: ', error);
      throw error;
    }
  };
};
export const dragActivityFromWishlist = (activity) => {
  return async (dispatch) => {
    try {
      dispatch(dragActivity(activity));
    } catch (error) {
      console.log('Unable to drag item from wishlist right now: ', error);
      throw error;
    }
  };
};
export const removeActivityFromCalendar = (item) => {
  return async (dispatch) => {
    try {
      dispatch(removeActivity(item));
    } catch (error) {
      console.log('Unable to delete item from Calendar right now: ', error);
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
    case RM_WISHLIST_ITEM:
      return state.filter((item) => item.id !== action.removedItem.id);
    case SET_WISHLIST:
      return action.wishlist;
    case DRAG_ACTIVITY:
      return state.filter((item) => {
        return item.activityId !== action.activity.id;
      });
    case REMOVE_ACTIVITY:
      return [action.item, ...state];
    default:
      return state;
  }
}
