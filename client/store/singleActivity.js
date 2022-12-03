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
      // make the GET request to NPS (to get parks things to do)
      const res = await axios.get(
        `https://developer.nps.gov/api/v1/thingstodo?parkCode=${parkCode}&id=${activityId}&api_key=${process.env.API_KEY}`
      );

      // get the park info (to get park's full name)
      const { data } = await axios.get(
        `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${process.env.API_KEY}`
      );

      dispatch(
        setActivity({
          ...res.data,
          parkUrl: data.data[0].url,
          parkCode: parkCode,
          parkName: data.data[0].fullName,
        })
      );
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
