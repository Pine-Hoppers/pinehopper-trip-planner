import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrips, deleteTrip } from '../store/alltrips';
import Button from '@material-ui/core/Button';
import { createTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';
import Joyride, { STATUS } from 'react-joyride';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#475841',
    },
  },
});

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UpdateIcon from '@material-ui/icons/Update';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import TabPanel from './TabPanel';

export class MyPlanner extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      run: !localStorage.getItem('exploreMyPlannerTourComplete'),
      steps: [
        {
          target: '.button-create-new-trip',
          content: 'Click here to create New Trip!',
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
  }
  componentDidMount() {
    this.props.getTrips(this.props.id);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.trips.length !== prevProps.trips.length) {
      this.props.getTrips(this.props.id);
    }
  }

  handleChange(event, newValue) {
    this.setState({ value: newValue });
  }

  handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      this.setState({ run: false });
    }
    if (data.action === 'reset') {
      localStorage.setItem('exploreMyPlannerTourComplete', true);
    }
  };

  render() {
    const { trips } = this.props;
    const pastTrips = trips.filter((trip) => {
      return moment(trip.endDate).isBefore(moment());
    });
    const upcomingTrips = trips.filter((trip) => {
      return moment(trip.endDate).isAfter(moment());
    });
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
        <div id="trips" className="column">
          <Link to="./my-planner/create-trip">
            <Button
              className="button-create-new-trip"
              variant="contained"
              color="primary"
            >
              Create New Trip
            </Button>
          </Link>

          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="icon label tabs example"
          >
            <Tab icon={<UpdateIcon />} label="Upcoming" />
            <Tab icon={<AllInboxIcon />} label="Past" />
          </Tabs>

          <TabPanel value={this.state.value} index={0}>
            {upcomingTrips.map((trip) => {
              const image =
                trip.activities && trip.activities[0]
                  ? JSON.parse(trip.activities[0].images[0]).url
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjjuxwyT22--xXK-GljMugRxSfO0mFZOYnhxvh2at3shT6zB6L5fYPoseyfozTG0pVYFA&usqp=CAU';
              var start = moment(trip.startDate);
              var end = moment(trip.endDate);
              return (
                <Card className="myplanner-card-container" key={trip.id}>
                  <CardActionArea>
                    <CardMedia
                      className="myplanner-card"
                      image={image}
                      title={trip.tripName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {trip.tripName}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        <Badge pill bg="light" text="dark">
                          Upcoming{' '}
                          {moment(trip.startDate).endOf('day').fromNow()}
                        </Badge>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {moment(trip.startDate).format('MMM Do YYYY')} ➞{' '}
                        {moment(trip.endDate).format('MMM Do YYYY')}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        🚁 Trip Length: 🌟 {end.to(trip.startDate, true)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <Link to={`/my-planner/${trip.id}`}>Details</Link>
                    </Button>
                    <Button size="small" color="primary">
                      <Link to={`/my-planner/${trip.id}/edit`}>Edit</Link>
                    </Button>
                    <Button
                      className="delete-button-myplanner"
                      size="small"
                      color="primary"
                      onClick={() => this.props.deleteTrip(trip.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            {pastTrips.map((trip) => {
              const image =
                trip.activities && trip.activities[0]
                  ? JSON.parse(trip.activities[0].images[0]).url
                  : 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fnpca.s3.amazonaws.com%2Fimages%2F10407%2F1512c733-fb36-4be2-be1d-352f507aa1f6-banner.jpg%3F1469813638&imgrefurl=https%3A%2F%2Fwww.npca.org%2Farticles%2F1282-the-14-parks-you-can-t-get-enough-of&tbnid=AvK3WcKmKY9fgM&vet=12ahUKEwir3Yqj5vL7AhWylXIEHQOICCgQMygJegUIARCkAw..i&docid=EuT6jZ0_5kWSEM&w=1600&h=900&q=national%20park%20pictures&ved=2ahUKEwir3Yqj5vL7AhWylXIEHQOICCgQMygJegUIARCkAw';

              return (
                <Card className="myplanner-card-container" key={trip.id}>
                  <CardActionArea>
                    <CardMedia
                      className="myplanner-card"
                      image={image}
                      title={trip.tripName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {trip.tripName}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        <Badge pill bg="light" text="dark">
                          {moment(trip.startDate).endOf('day').fromNow()}
                        </Badge>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {moment(trip.startDate).format('MMM Do YYYY')} ➞{' '}
                        {moment(trip.endDate).format('MMM Do YYYY')}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <Link to={`/my-planner/${trip.id}`}>Details</Link>
                    </Button>

                    <Button size="small" color="primary">
                      <Link to={`/my-planner/${trip.id}/edit`}>Edit</Link>
                    </Button>

                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.props.deleteTrip(trip.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </TabPanel>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
    id: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getTrips: (id) => dispatch(fetchTrips(id)),
    deleteTrip: (id) => dispatch(deleteTrip(id)),
  };
};

export default connect(mapStateToProps, mapDispatch)(MyPlanner);
