import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrips, deleteTrip } from '../store/alltrips';
import DeleteIcon from '@material-ui/icons/Delete';
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
  }
  componentDidMount() {
    this.props.getTrips(this.props.id);
  }

  render() {
    const { trips } = this.props;
    return (
      <div id="trips" className="column">
        <TableContainer component={Paper} className="trip-table">
          <Link to="./my-planner/create-trip">
            <button type="submit">Create New Trip</button>
          </Link>

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
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trips.map((trip) => (
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
                    <Link to={`/my-planner/${trip.id}/edit`}>
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Link>

                    <IconButton
                      aria-label="delete"
                      onClick={() => this.props.deleteTrip(trip.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
    id: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getTrips: (id) => dispatch(fetchTrips(id)),
    deleteTrip: (id) => dispatch(deleteTrip(id)),
  };
};

export default connect(mapStateToProps, mapDispatch)(MyPlanner);
