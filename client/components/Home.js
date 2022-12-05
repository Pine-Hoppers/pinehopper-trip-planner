import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <div>
        <h3>Welcome, {username}</h3>
      </div>
      <h4 id="trips">Upcoming Trips</h4>
      <TableContainer component={Paper} className="trip-table">
        <button type="submit" onClick={this.isClicked}>
          Create New Trip
        </button>
      </TableContainer>
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
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    getTrips: (id) => dispatch(fetchTrips(id)),
  };
};

export default connect(mapState, mapDispatch)(Home);
