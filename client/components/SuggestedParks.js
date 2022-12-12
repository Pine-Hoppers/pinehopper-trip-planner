import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Material UI: Card
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 170,
  },
});

// COMPONENT
export const SuggestedParks = (props) => {
  const { firstName } = props;
  const classes = useStyles();

  return (
    <div id="suggested-parks">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="yellowstone.jpg"
            title="Yellowstone National Park"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Yellowstone
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Features dramatic canyons, alpine rivers, gushing geysers. Home to
              hundreds of animal species, including bears, wolves and bison
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            className="yellowstone-activities"
            size="small"
            color="primary"
          >
            <Link to="/explore/yell/activities">See Activities</Link>
          </Button>
        </CardActions>
      </Card>

      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="JoshuaTreeNationalPark.jpeg"
            title="Joshua Tree National Park"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Joshua Tree
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Named for the region’s twisted, bristled Joshua trees. The park
              straddles the Colorado Desert and the Mojave Desert
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <Link to="/explore/jotr/activities">See Activities</Link>
          </Button>
        </CardActions>
      </Card>

      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="acadia.jpg"
            title="Acadia National Park"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Acadia
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Marked by woodland and glacier-scoured granite peaks, such as
              Cadillac Mountain, the highest point on the US East Coast
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <Link to="/explore/acad/activities">See Activities</Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

// CONTAINER
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
  };
};

export default connect(mapState)(SuggestedParks);
