import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchParkActivities } from '../store';
import Joyride, { STATUS } from 'react-joyride';

// COMPONENT
export class ParkActivities extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      run: !localStorage.getItem('exploreParkTourComplete'),
      steps: [
        {
          target: '.each-activity-layout',
          content: 'Select a park activity to view the details!',
        },
      ],
    };
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchParkActivities(this.props.match.params.parkCode);

    this.setState({ loading: false });
  }

  handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      this.setState({ run: false });
    }
    if (data.action === 'reset') {
      localStorage.setItem('exploreParkTourComplete', true);
    }
  };
  render() {
    if (this.state.loading) {
      return (
        <main>
          <h3>Loading...</h3>
        </main>
      );
    } else {
      const { parkCode } = this.props.match.params;

      const { activities } = this.props;
      const checkActivities = activities.data || [];
      const hasActivities = checkActivities.length !== 0;

      return (
        <main>
          <Joyride
            run={this.state.run}
            callback={this.handleJoyrideCallback}
            steps={this.state.steps}
            hideBackButton={true}
            hideCloseButton={true}
            showProgress
          />
          {<h3>{activities.parkName}</h3>}
          {!hasActivities && (
            <div id="no-park-activities">
              <p>Activities info is not available for this park currently. </p>
              <p>
                <a id="back-to-explore" href="/explore">
                  Explore another park!
                </a>
              </p>
            </div>
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
        </main>
      );
    }
  }
}

// CONTAINER
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
