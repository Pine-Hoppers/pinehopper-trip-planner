import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import activities from './activities';
import tripsReducer from './allTrips';
import singleTripReducer from './singleTrip';

const reducer = combineReducers({
  auth,
  activities,
  trips: tripsReducer,
  singleTrip: singleTripReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './activities';
export * from './allTrips';
export * from './singleTrip';
