import React from 'react';
import Calendar from './Calendar';
import Wishlist from './Wishlist';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
export const CreateTrip = (props) => {
  return (
    <div>
      <Link to={`/my-planner`}>
        <button>All Trips</button>
      </Link>
      <Wishlist />
      <Calendar />
    </div>
  );
};

/**
 * CONTAINER
 */

export default CreateTrip;
