import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
            <a href="/explore">
              Explore another park & Add activities into your wishlist!
            </a>
          </h3>
        ) : (
          wishlists.map((wishlist) => {
            <div key={wishlist.id} className="each-activity-layout">
              <img
                className="all-activities-img"
                src={wishlist.images[0].url}
              />
              <div className="each-activity-detail">
                <p>{wishlist.title}</p>
              </div>
            </div>;
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
