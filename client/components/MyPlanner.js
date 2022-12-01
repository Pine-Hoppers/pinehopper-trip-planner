import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrips, deleteTrip } from '../store/alltrips';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

export class MyPlanner extends React.Component {
  constructor() {
    super();
    this.state = {
      hasForm: false,
    };
    this.isClicked = this.isClicked.bind(this);
  }
  componentDidMount() {
    this.props.getTrips();
  }
  isClicked() {
    this.setState({ hasForm: true });
  }

  render() {
    const { trips } = this.props;
    return (
      <div id="trips" className="column">
        <TableContainer component={Paper} className="trip-table">
          <button type="submit" onClick={this.isClicked}>
            Create New Trip
          </button>
          {/* {this.state.hasAddForm ? <CreateTrip /> : null} */}
          <Table
            stickyHeader
            aria-label="sticky table"
            className="trip-admin-access"
          >
            <TableHead>
              <TableRow>
                <TableCell>All Trips</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trips.map((trip) =>
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
                    <TableCell align="right">{trip.startDate}</TableCell>
                    <TableCell align="right">{trip.endDate}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="edit"
                        onClick={() => this.isEditClicked(trip.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
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
    trips: state.trips,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getTrips: () => dispatch(fetchTrips()),
    deleteTrip: (trip) => dispatch(deleteTrip(trip)),
  };
};

export default connect(mapState, mapDispatch)(MyPlanner);
