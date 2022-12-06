import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchActivity, addItemToWishlist, fetchWishlist } from '../store';
import Details from './Details';

// bookmark icon: https://iconscout.com/unicons/explore/line
// import { UilBookmark } from '@iconscout/react-unicons';

/**
 * COMPONENT
 */
export class SingleActivity extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      bookmarked: false,
    };
    this.handleAddToWishlist = this.handleAddToWishlist.bind(this);
    this.setBookmarkIcon = this.setBookmarkIcon.bind(this);
  }

  async componentDidMount() {
    const { parkCode, activityId } = this.props.match.params;

    // load single activity
    await this.props.fetchActivity(parkCode, activityId);

    // check if activity is bookmarked
    this.setBookmarkIcon(activityId);

    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps) {
    // if wishlist was updated
    if (this.props.wishlist.length !== prevProps.wishlist.length) {
      const { activityId } = this.props.match.params;
      this.setBookmarkIcon(activityId);
    }
  }

  async handleAddToWishlist(event, activityInfo) {
    event.preventDefault();
    const { addItemToWishlist } = this.props;
    await addItemToWishlist(activityInfo);
  }

  async setBookmarkIcon(activityId) {
    // load wishlist
    await this.props.fetchWishlist(this.props.id);

    // check if this activity is already bookmarked
    const { wishlist } = this.props;
    if (wishlist.length > 0) {
      const isBookmarked = wishlist.some(
        (item) => item.activity.activity_id === activityId
      );
      if (isBookmarked) this.setState({ bookmarked: isBookmarked });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    } else {
      const { singleActivity } = this.props;

      const hasCaption =
        singleActivity.data[0].images[0].caption &&
        singleActivity.data[0].images[0].caption.length > 0;

      const hasCropImg =
        singleActivity.data[0].images[0].crops &&
        singleActivity.data[0].images[0].crops.length > 0;

      return (
        <main>
          <section className="single-activity" id="activity-header">
            <p>THING TO DO</p>

            <div id="bookmark-title">
              {!this.state.bookmarked && (
                <i
                  id="bookmark"
                  className="uil uil-bookmark"
                  onClick={(event) =>
                    this.handleAddToWishlist(event, singleActivity)
                  }
                ></i>
                // <UilBookmark
                //   id="bookmark"
                //   size="30"
                //   color="#b68d40"
                //   onClick={(event) =>
                //     this.handleAddToWishlist(event, singleActivity)
                //   }
                // />
              )}
              {this.state.bookmarked && (
                <i id="bookmark-solid" className="uis uis-bookmark"></i>
              )}
              <a className="activity-title" href={singleActivity.data[0].url}>
                {singleActivity.data[0].title}
              </a>
            </div>
            <a className="park-title" href={singleActivity.parkUrl}>
              {singleActivity.parkName}
            </a>
          </section>

          <figure className="single-activity">
            <img
              id="activity-img"
              src={
                hasCropImg
                  ? singleActivity.data[0].images[0].crops[0].url
                  : singleActivity.data[0].images[0].url
              }
            />
            {hasCaption && (
              <figcaption>
                {singleActivity.data[0].images[0].caption}
              </figcaption>
            )}
          </figure>

          <section className="single-activity" id="description-section">
            <div
              id="longDesc"
              dangerouslySetInnerHTML={{
                __html: singleActivity.data[0].longDescription,
              }}
            />
          </section>

          <section className="single-activity" id="details">
            <Details singleActivity={singleActivity} />
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
    id: state.auth.id,
    wishlist: state.wishlist,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchActivity: (parkCode, activityId) =>
      dispatch(fetchActivity(parkCode, activityId)),
    addItemToWishlist: (activityInfo) =>
      dispatch(addItemToWishlist(activityInfo)),
    fetchWishlist: (userId) => dispatch(fetchWishlist(userId)),
  };
};

export default connect(mapState, mapDispatch)(SingleActivity);
