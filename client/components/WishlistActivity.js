import React from 'react';
import { connect } from 'react-redux';
import { fetchWishlist } from '../store/wishlist';
import Wishlist from './Wishlist';

export class WishlistActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentDidMount() {
    await this.props.getWishlist(this.props.id);
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return (
        <main>
          <h3>Loading...</h3>
        </main>
      );
    } else {
      const { wishlist } = this.props;

      return (
        <Wishlist
          wishlist={wishlist}
          className={'wishlist-activity-in-wishlist'}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.id,
    wishlist: state.wishlist,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getWishlist: (id) => dispatch(fetchWishlist(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WishlistActivity);
