import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_ACTIVITY = 'SET_ACTIVITY';

/**
 * ACTION CREATORS
 */
const setActivity = (activity) => ({ type: SET_ACTIVITY, activity });

/**
 * THUNK CREATORS
 */
export const fetchActivity = (parkCode, activityId) => {
  return async (dispatch) => {
    try {
      // make the GET request to NPS
      const res = await axios.get(
        `https://developer.nps.gov/api/v1/thingstodo?parkCode=${parkCode}&id=${activityId}&api_key=${process.env.API_KEY}`
      );

      dispatch(setActivity(res.data));
    } catch (error) {
      console.log('Unable to fetch the activity info right now: ', error);
      throw error;
    }
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_ACTIVITY:
      return action.activity;
    default:
      return state;
  }
}
