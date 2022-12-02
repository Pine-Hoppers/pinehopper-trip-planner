import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import activities from './activities';
import trips from './alltrips';
import singleTripReducer from './singleTrip';
import wishlists from './wishlists';

const reducer = combineReducers({
  auth,
  activities,
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
export * from './alltrips';
export * from './singleTrip';
export * from './wishlists';
