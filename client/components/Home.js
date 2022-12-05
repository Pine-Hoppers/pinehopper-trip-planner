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
import Button from '@material-ui/core/Button';

export class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      hasForm: false,
    };
    this.isClicked = this.isClicked.bind(this);
  }
  componentDidMount() {
    this.props.getTrips(this.props.id);
  }
  isClicked() {
    this.setState({ hasForm: true });
  }

  render() {
    const { trips } = this.props;
    const { username } = this.props;

    return (
      <div>
        <h3>Welcome, {username}</h3>
        <h4 id="trips">Upcoming Trips</h4>
        <TableContainer component={Paper} className="trip-table">
          <button type="submit" onClick={this.isClicked}>
            Create New Trip
          </button>
          <Table>
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
    username: state.auth.username,
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
