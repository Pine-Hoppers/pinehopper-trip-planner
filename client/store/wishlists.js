import axios from 'axios';

const SET_WISHLISTS = 'SET_WISHLISTS';

export const setWishlists = (wishlists) => {
  return {
    type: SET_WISHLISTS,
    wishlists,
  };
};

export const fetchWishlists = (id) => {
  console.log('id=========>', id);
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/wishlists?id=${id}`);
      dispatch(setWishlists(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_WISHLISTS:
      return action.wishlists;
    default:
      return state;
  }
}
