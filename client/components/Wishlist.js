import React from 'react';
import { connect } from 'react-redux';

export class Wishlist extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { wishlist } = this.props;

    return (
      <div>
        <h1> Wishlist</h1>
        {wishlist.length === 0 ? (
          <h3>
            Your wishlist is empty now!
            <a href="/explore">Explore</a> another park & Add activities into
            your wishlist!
          </h3>
        ) : (
          wishlist.map((item) => {
            const image = JSON.parse(item.activity.images);

            return (
              <div
                className="each-activity-layout"
                draggable="true"
                key={item.id}
                onDragStart={() =>
                  this.props.handleDragStart({
                    title: item.activity.activity_name,
                    name: item.activity.activity_name,
                    id: item.activity.id,
                  })
                }
              >
                <img className="all-activities-img" src={image.url} />
                <div className="each-activity-detail">
                  <p>{item.activity.activity_name}</p>
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
    id: state.auth.id,
  };
};

export default connect(mapStateToProps, null)(Wishlist);
