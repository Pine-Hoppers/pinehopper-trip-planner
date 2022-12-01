import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleTrip, editSingelTrip } from '../store/singleTrip';
import Calendar from './Calendar';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    return (
      <div id="single-trip" className="column">
        <Link to={`/my-planner`}>
          <button>All Trips</button>
        </Link>
        {trip.activities.length === 0 ? <CircularProgress /> : <Calendar />}
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
