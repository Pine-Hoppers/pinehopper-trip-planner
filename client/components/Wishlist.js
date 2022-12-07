import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { removeItemFromWishlist } from '../store';

export class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.removeFromWishlist = this.removeFromWishlist.bind(this);
  }

  async removeFromWishlist(event, itemId) {
    event.preventDefault();
    const { removeItemFromWishlist } = this.props;
    await removeItemFromWishlist(itemId);
  }

  render() {
    const { wishlist } = this.props;

    return (
      <main>
        <h1> Wishlist</h1>
        <div className="all-activities-layout">
          {wishlist.length === 0 ? (
            <p>
              Your wishlist is empty now!
              <a href="/explore">Explore</a> another park & Add activities into
              your wishlist!
            </p>
          ) : (
            wishlist.map((item) => {
              const image = JSON.parse(item.activity.images);

              return (
                <section key={item.id} id="wishlist-section">
                  <CloseIcon
                    id="remove-icon"
                    style={{ fontSize: 30 }}
                    onClick={(event) => this.removeFromWishlist(event, item.id)}
                  />
                  <div
                    className="each-activity-layout"
                    draggable="true"
                    onDragStart={() =>
                      this.props.handleDragStart({
                        title: item.activity.activity_name,
                        name: item.activity.activity_name,
                        id: item.activity.id,
                      })
                    }
                  >
                    <Link
                      to={`/explore/${item.activity.parkCode}/activities/${item.activity.activity_id}`}
                    >
                      <img className="all-activities-img" src={image.url} />
                      <div className="each-activity-detail">
                        <p>{item.activity.activity_name}</p>
                      </div>
                    </Link>
                  </div>
                </section>
              );
            })
          )}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    removeItemFromWishlist: (itemId) =>
      dispatch(removeItemFromWishlist(itemId)),
  };
};

export default connect(mapStateToProps, mapDispatch)(Wishlist);
