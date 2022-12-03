import React from 'react';
import { connect } from 'react-redux';
import { fetchTrips } from '../store/alltrips';

// /**
//  * COMPONENT
//  */
// export const Home = (props) => {
//   const { username } = props;

//   return (
//     <div>
//       <h3>Welcome, {username}</h3>
//     </div>
//   );
// };

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     username: state.auth.username,
//   };
// };

// export default connect(mapState)(Home);

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
    console.log('MY TRIPS', trips);
    const { username } = this.props;

    return (
      <div>
        <div>
          <h3>Welcome, {username}</h3>
        </div>
        <h4 id="trips">Upcoming Trips</h4>
        {/* TODO: FIGURE OUT HOW TO GET TRIPS TO SHOW UP HERE, THEN STYLE THEM.
        {trips} */}
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
