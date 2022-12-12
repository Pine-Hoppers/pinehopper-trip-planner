import { SET_WISHLIST } from './wishlist';

export default function (state = [], action) {
  switch (action.type) {
    case SET_WISHLIST:
      return action.wishlist;
    default:
      return state;
  }
}
