import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchActivity, addItemToWishlist } from '../store';

/**
 * COMPONENT
 */
export class SingleActivity extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.handleAddToWishlist = this.handleAddToWishlist.bind(this);
  }

  async componentDidMount() {
    const { parkCode, activityId } = this.props.match.params;
    await this.props.fetchActivity(parkCode, activityId);
    this.setState({ loading: false });
  }

  async handleAddToWishlist(event, activityInfo) {
    event.preventDefault();
    const { addItemToWishlist } = this.props;
    await addItemToWishlist(activityInfo);
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    } else {
      const { parkCode, activityId } = this.props.match.params;
      const { singleActivity } = this.props;

      return (
        <main>
          {<h3>{singleActivity.data[0].title}</h3>}
          {<h4>{singleActivity.parkName}</h4>}
          <div
            onClick={(event) => this.handleAddToWishlist(event, singleActivity)}
          >
            Add to Wishlist
          </div>
        </main>
      );
    }
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    singleActivity: state.singleActivity,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchActivity: (parkCode, activityId) =>
      dispatch(fetchActivity(parkCode, activityId)),
    addItemToWishlist: (activityInfo) =>
      dispatch(addItemToWishlist(activityInfo)),
  };
};

export default connect(mapState, mapDispatch)(SingleActivity);
