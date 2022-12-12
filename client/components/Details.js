import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveIcon from '@material-ui/icons/Remove';
import Joyride, { STATUS } from 'react-joyride';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [{ run, steps }, setState] = useState({
    run: !localStorage.getItem('exploreDetailActivityTourComplete'),
    steps: [
      {
        target: '#bookmark',
        content:
          'Click the bookmark to add this park activity into your wishlist! Then, click on Wishlist in the sidebar, or go to My Planner in the sidebar to plan your trip!',
      },
    ],
  });
  const { singleActivity } = props;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const seasonAvailable =
    singleActivity.data[0].season && singleActivity.data[0].season.length > 0;

  const timeOfDayAvail =
    singleActivity.data[0].timeOfDay &&
    singleActivity.data[0].timeOfDay.length > 0;

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }
    if (data.action === 'reset') {
      localStorage.setItem('exploreDetailActivityTourComplete', true);
    }
  };
  return (
    <div id="accordion" className={classes.root}>
      <Joyride
        run={run}
        callback={handleJoyrideCallback}
        steps={steps}
        hideBackButton={true}
        hideCloseButton={true}
        showProgress
      />
      {singleActivity.data[0].activities && (
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={
              singleActivity.data[0].activityDescription ? (
                <ExpandMoreIcon />
              ) : (
                <RemoveIcon style={{ color: '#fff' }} />
              )
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>ACTIVITY</Typography>
            <Typography className={classes.secondaryHeading}>
              {singleActivity.data[0].activities[0].name}
            </Typography>
          </AccordionSummary>
          {singleActivity.data[0].activityDescription && (
            <AccordionDetails>
              <div
                dangerouslySetInnerHTML={{
                  __html: singleActivity.data[0].activityDescription,
                }}
              />
            </AccordionDetails>
          )}
        </Accordion>
      )}

      {singleActivity.data[0].doFeesApply && (
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={
              singleActivity.data[0].feeDescription ? (
                <ExpandMoreIcon />
              ) : (
                <RemoveIcon style={{ color: '#fff' }} />
              )
            }
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>ACTIVITY FEE</Typography>
            <Typography className={classes.secondaryHeading}>
              {singleActivity.data[0].doFeesApply === 'false' ? 'No' : 'Yes'}
            </Typography>
          </AccordionSummary>
          {singleActivity.data[0].feeDescription && (
            <AccordionDetails>
              <div
                dangerouslySetInnerHTML={{
                  __html: singleActivity.data[0].feeDescription,
                }}
              />
            </AccordionDetails>
          )}
        </Accordion>
      )}

      {singleActivity.data[0].duration && (
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={
              singleActivity.data[0].durationDescription ? (
                <ExpandMoreIcon />
              ) : (
                <RemoveIcon style={{ color: '#fff' }} />
              )
            }
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>DURATION</Typography>
            <Typography className={classes.secondaryHeading}>
              {singleActivity.data[0].duration}
            </Typography>
          </AccordionSummary>
          {singleActivity.data[0].durationDescription && (
            <AccordionDetails>
              <div
                dangerouslySetInnerHTML={{
                  __html: singleActivity.data[0].durationDescription,
                }}
              />
            </AccordionDetails>
          )}
        </Accordion>
      )}

      {singleActivity.data[0].location && (
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={
              singleActivity.data[0].locationDescription ? (
                <ExpandMoreIcon />
              ) : (
                <RemoveIcon style={{ color: '#fff' }} />
              )
            }
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>LOCATION</Typography>
            <Typography className={classes.secondaryHeading}>
              {singleActivity.data[0].location}
            </Typography>
          </AccordionSummary>
          {singleActivity.data[0].locationDescription && (
            <AccordionDetails>
              <div
                dangerouslySetInnerHTML={{
                  __html: singleActivity.data[0].locationDescription,
                }}
              />
            </AccordionDetails>
          )}
        </Accordion>
      )}

      {singleActivity.data[0].arePetsPermitted && (
        <Accordion
          expanded={expanded === 'panel5'}
          onChange={handleChange('panel5')}
        >
          <AccordionSummary
            expandIcon={
              singleActivity.data[0].petsDescription ? (
                <ExpandMoreIcon />
              ) : (
                <RemoveIcon style={{ color: '#fff' }} />
              )
            }
            aria-controls="panel5bh-content"
            id="panel5bh-header"
          >
            <Typography className={classes.heading}>PETS ALLOWED</Typography>
            <Typography className={classes.secondaryHeading}>
              {singleActivity.data[0].arePetsPermitted === 'false'
                ? 'No'
                : 'Yes'}
            </Typography>
          </AccordionSummary>
          {singleActivity.data[0].petsDescription && (
            <AccordionDetails>
              <div
                dangerouslySetInnerHTML={{
                  __html: singleActivity.data[0].petsDescription,
                }}
              />
            </AccordionDetails>
          )}
        </Accordion>
      )}

      {singleActivity.data[0].isReservationRequired && (
        <Accordion
          expanded={expanded === 'panel6'}
          onChange={handleChange('panel6')}
        >
          <AccordionSummary
            expandIcon={
              singleActivity.data[0].reservationDescription ? (
                <ExpandMoreIcon />
              ) : (
                <RemoveIcon style={{ color: '#fff' }} />
              )
            }
            aria-controls="panel6bh-content"
            id="panel6bh-header"
          >
            <Typography className={classes.heading}>RESERVATIONS</Typography>
            <Typography className={classes.secondaryHeading}>
              {singleActivity.data[0].isReservationRequired === 'false'
                ? 'No'
                : 'Yes'}
            </Typography>
          </AccordionSummary>
          {singleActivity.data[0].reservationDescription && (
            <AccordionDetails>
              <div
                dangerouslySetInnerHTML={{
                  __html: singleActivity.data[0].reservationDescription,
                }}
              />
            </AccordionDetails>
          )}
        </Accordion>
      )}

      {seasonAvailable && (
        <Accordion
          expanded={expanded === 'panel7'}
          onChange={handleChange('panel7')}
        >
          <AccordionSummary
            expandIcon={
              singleActivity.data[0].seasonDescription ? (
                <ExpandMoreIcon />
              ) : (
                <RemoveIcon style={{ color: '#fff' }} />
              )
            }
            aria-controls="panel7bh-content"
            id="panel7bh-header"
          >
            <Typography className={classes.heading}>SEASON</Typography>
            <Typography className={classes.secondaryHeading}>
              {singleActivity.data[0].season.join(', ')}
            </Typography>
          </AccordionSummary>
          {singleActivity.data[0].seasonDescription && (
            <AccordionDetails>
              <div
                dangerouslySetInnerHTML={{
                  __html: singleActivity.data[0].seasonDescription,
                }}
              />
            </AccordionDetails>
          )}
        </Accordion>
      )}

      {timeOfDayAvail && (
        <Accordion
          expanded={expanded === 'panel8'}
          onChange={handleChange('panel8')}
        >
          <AccordionSummary
            expandIcon={
              singleActivity.data[0].timeOfDayDescription ? (
                <ExpandMoreIcon />
              ) : (
                <RemoveIcon style={{ color: '#fff' }} />
              )
            }
            aria-controls="panel8bh-content"
            id="panel8bh-header"
          >
            <Typography className={classes.heading}>TIME OF DAY</Typography>
            <Typography className={classes.secondaryHeading}>
              {singleActivity.data[0].timeOfDay.join(', ')}
            </Typography>
          </AccordionSummary>
          {singleActivity.data[0].timeOfDayDescription && (
            <AccordionDetails>
              <div
                dangerouslySetInnerHTML={{
                  __html: singleActivity.data[0].timeOfDayDescription,
                }}
              />
            </AccordionDetails>
          )}
        </Accordion>
      )}
    </div>
  );
}
