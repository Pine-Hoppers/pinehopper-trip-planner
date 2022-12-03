import React from 'react';
import { connect } from 'react-redux';
import { fetchWishlists } from '../store/wishlists';

export class Wishlist extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getWishlists(this.props.id);
  }

  render() {
    const { wishlists } = this.props;

    return (
      <div>
        <h1> Wishlist</h1>
        {wishlists.length === 0 ? (
          <h3>
            Your wishlist is empty now!
            <a href="/explore">Explore</a> another park & Add activities into
            your wishlist!
          </h3>
        ) : (
          wishlists.map((wishlist) => {
            const image = JSON.parse(wishlist.activity.images);

            return (
              <div key={wishlist.id} className="each-activity-layout">
                <img className="all-activities-img" src={image.url} />
                <div className="each-activity-detail">
                  <p>{wishlist.activity.activity_name}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wishlists: state.wishlists,
    id: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getWishlists: (id) => dispatch(fetchWishlists(id)),
  };
};

export default connect(mapStateToProps, mapDispatch)(Wishlist);
