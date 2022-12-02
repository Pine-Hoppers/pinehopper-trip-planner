import axios from 'axios';

// ACTION TYPES
const SET_TRIPS = 'SET_TRIPS';
const CREATE_TRIP = 'CREATE_TRIP';
const DELETE_TRIP = 'DELETE_TRIP';

// ACTION CREATORS
export const setTrips = (trips) => {
  return {
    type: SET_TRIPS,
    trips,
  };
};

export const fetchTrips = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/trips');
      dispatch(setTrips(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const _createTrip = (trip) => {
  return {
    type: CREATE_TRIP,
    trip,
  };
};

const _deleteTrip = (trip) => {
  return {
    type: DELETE_TRIP,
    trip,
  };
};

// THUNKS
export const createTrip = (trip) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/trips', trip);
    dispatch(_createTrip(created));
  };
};

export const deleteTrip = (id) => {
  return async (dispatch) => {
    const { data: trip } = await axios.delete(`/api/trips/${id}`);
    dispatch(_deleteTrip(trip));
  };
};

// REDUCERS
const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TRIPS:
      return action.trips;
    case CREATE_TRIP:
      return [...state, action.trip];
    case DELETE_TRIP:
      return state.filter((trip) => trip.id !== action.trip.id);
    default:
      return state;
  }
}
