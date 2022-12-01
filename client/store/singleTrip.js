import axios from 'axios';

const SET_SINGLE_TRIP = 'SET_SINGLE_TRIP';

export const setSingleTrip = (trip) => {
  return {
    type: SET_SINGLE_TRIP,
    trip,
  };
};

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

export default function singleTripReducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_TRIP:
      return action.trip;
    default:
      return state;
  }
}
