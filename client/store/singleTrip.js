import axios from 'axios';

// ACTION TYPES
const SET_SINGLE_TRIP = 'SET_SINGLE_TRIP';
const SET_TRIPS = 'SET_TRIPS';

// ACTION CREATORS
export const setSingleTrip = (trip) => {
  return {
    type: SET_SINGLE_TRIP,
    trip,
  };
};

// THUNKS
export const fetchSingleTrip = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/trips/${id}`);
      dispatch(setSingleTrip(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const initialState = {
  activities: [],
};

export default function singleTripReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRIPS:
      return initialState;
    case SET_SINGLE_TRIP:
      return action.trip;
    default:
      return state;
  }
}
