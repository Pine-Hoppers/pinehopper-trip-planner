import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrips } from '../store/alltrips';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

export class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      hasForm: false,
    };
    this.isClicked = this.isClicked.bind(this);
  }
  async componentDidMount() {
    await this.props.getTrips(this.props.id);
  }
  isClicked() {
    this.setState({ hasForm: true });
  }

  render() {
    const { trips } = this.props;
    const { firstName } = this.props;
    let pastTripArr = [];
    let upcomingTripArr = [];

    const checkIfPast = function (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    };

    if (trips.length > 0) {
      trips.map((trip) => {
        if (checkIfPast(new Date(trip.endDate))) {
          pastTripArr.push(trip);
        } else {
          upcomingTripArr.push(trip);
        }
      });
    }

    return (
      <div>
        <h3>Welcome, {firstName}</h3>
        <Link to="./my-planner/create-trip">
          <Button
            className="button-create-new-trip"
            variant="contained"
            color="primary"
          >
            Create New Trip
          </Button>
        </Link>
        <TableContainer component={Paper} className="trip-table">
          <h4 id="trips">Upcoming Trips</h4>
          <Table>
            <TableBody>
              {upcomingTripArr.map((trip) =>
                this.state.editId === trip.id ? (
                  <TableRow
                    key={trip.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <EditTrip trip={trip} onClickUpdate={this.isEditClicked} />
                  </TableRow>
                ) : (
                  <TableRow
                    key={trip.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link to={`/my-planner/${trip.id}`}>{trip.tripName}</Link>
                    </TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} className="trip-table">
          <h4 id="trips">Past Trips</h4>
          <Table>
            <TableBody>
              {pastTripArr.map((trip) =>
                this.state.editId === trip.id ? (
                  <TableRow
                    key={trip.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <EditTrip trip={trip} onClickUpdate={this.isEditClicked} />
                  </TableRow>
                ) : (
                  <TableRow
                    key={trip.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link to={`/my-planner/${trip.id}`}>{trip.tripName}</Link>
                    </TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
    trips: state.trips,
    id: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getTrips: (id) => dispatch(fetchTrips(id)),
  };
};

export default connect(mapState, mapDispatch)(Home);
