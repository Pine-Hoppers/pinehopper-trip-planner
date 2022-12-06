import axios from 'axios';
const TOKEN = 'token';

// ACTION TYPES
const SET_TRIPS = 'SET_TRIPS';
const CREATE_TRIP = 'CREATE_TRIP';
const GET_UPCOMING_TRIPS = 'GET_UPCOMING_TRIPS';
const GET_PAST_TRIPS = 'GET_PAST_TRIPS';
const DELETE_TRIP = 'DELETE_TRIP';

// ACTION CREATORS
export const setTrips = (trips) => {
  return {
    type: SET_TRIPS,
    trips,
  };
};

export const fetchTrips = (id) => {
  return async (dispatch) => {
    try {
      const userToken = window.localStorage.getItem(TOKEN);
      if (userToken) {
        const { data } = await axios.get(`/api/trips?id=${id}`, {
          headers: {
            authorization: userToken,
          },
        });
        dispatch(setTrips(data));
      }
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
    try {
      const userToken = window.localStorage.getItem(TOKEN);
      if (userToken) {
        const { data: created } = await axios.post('/api/trips', trip, {
          headers: {
            authorization: userToken,
          },
        });
        dispatch(_createTrip(created));
      }
    } catch (error) {
      console.log('Unable to add item to wishlist right now: ', error);
      throw error;
    }
  };
};

export const deleteTrip = (id) => {
  return async (dispatch) => {
    try {
      const userToken = window.localStorage.getItem(TOKEN);
      if (userToken) {
        const { data: trip } = await axios.delete(`/api/trips/${id}`, {
          headers: {
            authorization: userToken,
          },
        });
        dispatch(_deleteTrip(trip));
      }
    } catch (error) {
      console.log('Unable to add item to wishlist right now: ', error);
      throw error;
    }
  };
};

// REDUCER
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
