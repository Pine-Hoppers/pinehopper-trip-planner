import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import Home from './components/Home';
import MyPlanner from './components/MyPlanner';
import MySinglePlanner from './components/MySinglePlanner';
import Explore from './components/Explore';
import ParkActivities from './components/ParkActivities';
import SingleActivity from './components/SingleActivity';
import CreateTrip from './components/CreateTrip';
import WishlistActivity from './components/WishlistActivity';
import { me } from './store';

// COMPONENT
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/wishlist" component={WishlistActivity} />
            <Route
              path="/explore/:parkCode/activities/:activityId"
              component={SingleActivity}
            />
            <Route
              path="/explore/:parkCode/activities"
              component={ParkActivities}
            />
            <Route exact path="/my-planner" component={MyPlanner} />
            <Route
              exact
              path="/my-planner/create-trip"
              component={CreateTrip}
            />
            <Route
              exact
              path="/my-planner/:tripId"
              component={MySinglePlanner}
            />
            <Route
              exact
              path="/my-planner/:tripId/:mode"
              component={CreateTrip}
            />

            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

// CONTAINER
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// When the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
