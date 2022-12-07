import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleTrip } from '../store/singleTrip';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setTrips } from '../store/alltrips';
import history from '../history';

const mLocalizer = momentLocalizer(moment);

class SingleTrip extends React.Component {
  constructor() {
    super();
    this.state = {
      hasForm: false,
      selectedEvent: undefined,
    };
    this.handleSelected = this.handleSelected.bind(this);
    this.isClicked = this.isClicked.bind(this);
  }

  async componentDidMount() {
    await this.props.getSingleTrip(this.props.match.params.tripId);
  }

  handleSelected(event) {
    this.setState({ selectedEvent: event });

    const { trip } = this.props;
    let parkCode = '';
    let activityId = '';

    // find the activity's park code & activity id
    trip.activities.forEach((item) => {
      if (event.title === item.activity_name) {
        parkCode = item.parkCode;
        activityId = item.activity_id;
      }
    });

    // redirect user to the SingleActivity page
    history.push(`/explore/${parkCode}/activities/${activityId}`);
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
            selected={this.state.selectedEvent}
            onSelectEvent={this.handleSelected}
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
