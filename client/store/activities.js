import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_ACTIVITIES = 'SET_ACTIVITIES';

/**
 * ACTION CREATORS
 */
const setActivities = (activities) => ({ type: SET_ACTIVITIES, activities });

/**
 * THUNK CREATORS
 */
export const fetchParkActivities = (parkCode) => {
  return async (dispatch) => {
    try {
      // make the GET request to NPS
      const res = await axios.get(
        `https://developer.nps.gov/api/v1/thingstodo?parkCode=${parkCode}&limit=90&api_key=${process.env.API_KEY}`
      );

      const { data } = await axios.get(
        `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${process.env.API_KEY}`
      );

      dispatch(setActivities({ ...res.data, parkName: data.data[0].fullName }));
    } catch (error) {
      console.log('Unable to fetch park activities right now: ', error);
      throw error;
    }
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_ACTIVITIES:
      return action.activities;
    default:
      return state;
  }
}
