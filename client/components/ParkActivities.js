import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
export const ParkActivities = (props) => {
  const { parkCode } = props.match.params;
  const { activities } = props;
  const checkActivities = activities.data || [];
  const hasActivities = checkActivities.length !== 0;

  return (
    <div>
      {!hasActivities && (
        <h3>
          Activities info is not available for this park currently.{' '}
          <a href="/explore">Explore another park!</a>
        </h3>
      )}
      {hasActivities && <h3>{activities.data[0].relatedParks[0].fullName}</h3>}

      <div className="all-activities-layout">
        {hasActivities &&
          activities.data.map((activity) => (
            <div key={activity.id} className="each-activity-layout">
              <Link to={`/explore/${parkCode}/activities/${activity.id}`}>
                <img
                  className="all-activities-img"
                  src={activity.images[0].url}
                />
                <div className="each-activity-detail">
                  <p>{activity.title}</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    activities: state.activities,
  };
};

export default connect(mapState)(ParkActivities);
