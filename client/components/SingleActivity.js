import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchActivity, addItemToWishlist } from '../store';
import { UilBookmarkFull } from '@iconscout/react-unicons';

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
          <section className="single-activity" id="activity-header">
            {/* <Link to={`/explore/${parkCode}/activities`}>
              BACK TO ACTIVITIES
            </Link> */}
            <p>THING TO DO</p>

            <div id="bookmark-title">
              <UilBookmarkFull
                id="bookmark"
                size="30"
                color="#b68d40"
                onClick={(event) =>
                  this.handleAddToWishlist(event, singleActivity)
                }
              />
              <a className="activity-title" href={singleActivity.data[0].url}>
                {singleActivity.data[0].title}
              </a>
            </div>
            <a className="park-title" href={singleActivity.parkUrl}>
              {singleActivity.parkName}
            </a>
          </section>
          <section className="single-activity">
            <img id="activity-img" src={singleActivity.data[0].images[0].url} />
            {/* <div
              onClick={(event) =>
                this.handleAddToWishlist(event, singleActivity)
              }
            >
              <img id="bookmark" src="/bookmark-full.svg" />
            </div> */}
          </section>
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
