import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import activities from './activities';
import singleActivity from './singleActivity';
import wishlist from './wishlist';
import trips from './alltrips';
import singleTripReducer from './singleTrip';
import wishlists from './wishlists';

const reducer = combineReducers({
  auth,
  activities,
  singleActivity,
  wishlist,
  trips,
  singleTrip: singleTripReducer,
  wishlists,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './activities';
export * from './singleActivity';
export * from './alltrips';
export * from './singleTrip';
export * from './wishlists';
export * from './wishlist';
