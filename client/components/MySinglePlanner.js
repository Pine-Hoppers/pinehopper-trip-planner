import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleTrip } from '../store/singleTrip';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import CircularProgress from '@material-ui/core/CircularProgress';

const mLocalizer = momentLocalizer(moment);

class SingleTrip extends React.Component {
  constructor() {
    super();
    this.state = {
      hasForm: false,
    };
    this.isClicked = this.isClicked.bind(this);
  }
  componentDidMount() {
    this.props.getSingleTrip(this.props.match.params.tripId);
  }
  isClicked() {
    this.setState({ hasForm: true });
  }
  render() {
    const trip = this.props.trip;
    const myEvents = this.props.trip.activities.map((activity) => ({
      start: activity.dateOfActivity,
      end: activity.dateOfActivity,
      title: activity.activity_name,
    }));
    return (
      <div id="single-trip" className="column calendar-container">
        <h1>{trip.tripName}</h1>

        {trip.activities.length === 0 ? (
          <CircularProgress />
        ) : (
          <Calendar
            defaultDate={trip.startDate}
            events={myEvents}
            localizer={mLocalizer}
          />
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    trip: state.singleTrip,
  };
};
const mapDispatch = (dispatch) => {
  return {
    getSingleTrip: (id) => dispatch(fetchSingleTrip(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleTrip);
