import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { removeItemFromWishlist } from '../store';

// Material UI: NativeSelect
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// WISHLIST COMPONENT
export const Wishlist = (props) => {
  const classes = useStyles();
  const [wishlistArray, setwishlistArray] = useState([]);
  const [parksList, setParksList] = useState([]);
  const [formState, setFormState] = useState({
    park: '',
    name: 'hai',
  });

  // ON MOUNT
  useEffect(() => {
    const { wishlist } = props;

    // iterate through the wishlist items, to get list of parks
    if (wishlist.length > 0) {
      let parks = {};

      wishlist.forEach((item) => {
        const parkName = item.activity.park_fullName;

        // if parkName is not included in parks list, add it
        if (!parks[parkName]) {
          parks[parkName] = true;
        }
      });

      setParksList(Object.keys(parks).sort());
      setwishlistArray(wishlist);
    }
  }, []);

  // WILL RUN WHEN FORMSTATE UPDATES
  useEffect(() => {
    const { wishlist } = props;

    // user selected All Parks
    if (formState.park.length === 0) {
      setwishlistArray(wishlist);
    } else {
      // filter wishlist by the selected park
      const filteredWishlist = wishlist.filter(
        (item) => item.activity.park_fullName === formState.park
      );
      setwishlistArray(filteredWishlist);
    }
  }, [formState]);

  // WHEN PROPS.WISHLIST UPDATES
  useEffect(() => {
    const { wishlist } = props;

    // user selected All Parks
    if (formState.park.length === 0) {
      setwishlistArray(wishlist);
    } else {
      // filter wishlist by the selected park
      const filteredWishlist = wishlist.filter(
        (item) => item.activity.park_fullName === formState.park
      );

      // if filteredWishlist is empty
      if (filteredWishlist.length === 0) {
        // remove this park from Filter dropdown
        const newParkList = parksList.filter((parkName) => {
          return parkName !== formState.park;
        });
        setParksList(newParkList.sort());

        // then display all activities in Wishlist
        setFormState({
          ...formState,
          park: '',
        });
      } else {
        // otherwise, display the filtered Wishlist
        setwishlistArray(filteredWishlist);
      }
    }
  }, [props.wishlist]);

  const removeFromWishlist = async (event, itemId) => {
    event.preventDefault();
    const { removeItemFromWishlist } = props;
    await removeItemFromWishlist(itemId);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setFormState({
      ...formState,
      [name]: event.target.value,
    });
  };

  console.log('wishlistArray: ', wishlistArray);
  return (
    <main>
      <h1> Wishlist</h1>

      {wishlistArray.length !== 0 && (
        <div>
          <FormControl className={classes.formControl}>
            <NativeSelect
              value={formState.park}
              onChange={handleChange}
              name="park"
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'park' }}
            >
              <option value="">All Parks</option>
              {parksList.map((park, index) => (
                <option key={index} value={park}>
                  {park}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
      )}

      <div className="all-activities-layout">
        {wishlistArray.length === 0 && (
          <p>
            Your wishlist is empty now! <a href="/explore">Explore</a> another
            park & add activities into your wishlist!
          </p>
        )}

        {wishlistArray.length !== 0 &&
          wishlistArray.map((item) => {
            const image = JSON.parse(item.activity.images);

            return (
              <section key={item.id} id="wishlist-section">
                <CloseIcon
                  id="remove-icon"
                  style={{ fontSize: 30 }}
                  onClick={(event) => removeFromWishlist(event, item.id)}
                />
                <div
                  className="each-activity-layout"
                  draggable="true"
                  onDragStart={() =>
                    props.handleDragStart({
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
          })}
      </div>
    </main>
  );
};

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
