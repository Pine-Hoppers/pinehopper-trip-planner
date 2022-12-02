import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchParkActivities } from '../store';

/**
 * COMPONENT
 */
export class ParkActivities extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      parkName: '',
    };
  }

  async componentDidMount() {
    await this.props.fetchParkActivities(this.props.match.params.parkCode);

    let parkFullName =
      typeof this.props.location.state !== 'undefined'
        ? this.props.location.state.parkName
        : this.props.activities.parkName;

    this.setState({ parkName: parkFullName });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    } else {
      const { parkCode } = this.props.match.params;

      const { activities } = this.props;
      const checkActivities = activities.data || [];
      const hasActivities = checkActivities.length !== 0;

      return (
        <div>
          {<h3>{this.state.parkName}</h3>}
          {!hasActivities && (
            <p>
              Activities info is not available for this park currently.{' '}
              <a href="/explore">Explore another park!</a>
            </p>
          )}
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
    }
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    activities: state.activities,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchParkActivities: (parkCode) => dispatch(fetchParkActivities(parkCode)),
  };
};

export default connect(mapState, mapDispatch)(ParkActivities);
