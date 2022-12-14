import React, { useCallback, useState, useEffect } from 'react';
import Calendar from './DnDCalendar';
import Wishlist from './Wishlist';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { createTrip, updateTrip } from '../store/alltrips';
import { fetchWishlist, removeActivityFromCalendar } from '../store/wishlist';
import { fetchSingleTrip } from '../store/singleTrip';
import Joyride, { STATUS } from 'react-joyride';

/**
 * COMPONENT
 */
export const CreateTrip = (props) => {
  const [myTripName, setTripName] = useState();
  const [myEvents, setMyEvents] = useState([]);
  const [myRemovedActivities, setRemovedActivities] = useState([]);
  const [{ run, steps }, setState] = useState({
    run: !localStorage.getItem('createTripTourComplete'),
    steps: [
      {
        target: '.trip-name-textfield',
        content: 'Enter your trip name here!',
      },
      {
        target: '#wishlist-section',
        content: 'Drag the activity to the calendar on your right!',
      },
      {
        target: '.save-button-here',
        content: 'Click here to save your trip!',
      },
    ],
  });

  useEffect(() => {
    if (props.match.params.tripId) {
      props.getSingleTrip(props.match.params.tripId);
    }

    props.getWishlist(props.id);
  }, []);

  useEffect(() => {
    if (props.trip.tripName) {
      setTripName(props.trip.tripName);
    }
  }, [props.trip.tripName]);

  useEffect(() => {
    setMyEvents(
      props.trip.activities.map((activity) => ({
        start: activity.dateOfActivity,
        end: activity.dateOfActivity,
        title: activity.activity_name,
        isDraggable: true,
        id: activity.id,
      }))
    );
  }, [props.trip.activities]);

  const handleChange = (event) => {
    setTripName(event.target.value);
  };
  const handleClick = () => {
    let matchActivities = myEvents.map((item) => ({
      activityId: item.id,
      dateOfActivity: item.start,
    }));
    if (props.match.params.mode !== 'edit') {
      props.createTrip({
        tripName: myTripName,
        userId: props.id,
        startDate: myEvents[0].start,
        endDate: myEvents[myEvents.length - 1].start,
        activities: matchActivities,
      });
    }
    if (props.match.params.mode === 'edit') {
      props.updateTrip({
        id: props.trip.id,
        tripName: myTripName,
        startDate: myEvents[0].start,
        endDate: myEvents[myEvents.length - 1].start,
        activities: matchActivities,
        removedActivities: myRemovedActivities,
      });
    }
    props.history.push('/my-planner');
  };

  const [draggedEvent, setDraggedEvent] = useState();
  const handleDragStart = useCallback((event) => setDraggedEvent(event), []);
  const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent]);
  const newEvent = useCallback(
    (event) => {
      setMyEvents((prev) => {
        return [...prev, event];
      });
    },
    [setMyEvents]
  );
  const onDropFromOutside = useCallback(
    ({ start, end, allDay: isAllDay }) => {
      if (draggedEvent === 'undroppable') {
        setDraggedEvent(null);
        return;
      }
      const { name, id } = draggedEvent;
      const event = {
        title: name,
        id,
        start,
        end,
        isAllDay,
      };
      setDraggedEvent(null);
      newEvent(event);
    },
    [draggedEvent, setDraggedEvent, newEvent]
  );

  const customOnDragOver = useCallback(
    (dragEvent) => {
      // check for undroppable is specific to this example
      // and not part of API. This just demonstrates that
      // onDragOver can optionally be passed to conditionally
      // allow draggable items to be dropped on cal, based on
      // whether event.preventDefault is called
      if (draggedEvent !== 'undroppable') {
        dragEvent.preventDefault();
      }
    },
    [draggedEvent]
  );

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setMyEvents]
  );
  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents]
  );
  const onSelectEvent = (pEvent) => {
    const r = window.confirm(
      'Would you like to move this activity back to wishlist?'
    );
    let removedEvent;
    if (r === true) {
      // edit has trip activities
      const isEdit = props.trip.activities[0];
      setMyEvents((prevState) => {
        const events = [...prevState];
        const idx = events.findIndex((event) => event.id === pEvent.id);

        removedEvent = events.splice(idx, 1);
        return events;
      });
      const activities = isEdit
        ? props.trip.activities
        : props.originalWishlist;
      let a = activities.find((item) => {
        if (isEdit) {
          return removedEvent[0].id === item.id;
        } else {
          return pEvent.id === item.activityId;
        }
      });

      if (isEdit) {
        props.removeActivityFromCalendar({
          activityId: a.id,
          activity: a,
          userId: props.id,
        });
      } else {
        props.removeActivityFromCalendar(a);
      }

      setRemovedActivities((prevState) => {
        return [...prevState, a];
      });
    }
  };
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }
    if (data.action === 'reset') {
      localStorage.setItem('createTripTourComplete', true);
    }
  };

  return (
    <div className="createTrip">
      <Joyride
        run={run}
        callback={handleJoyrideCallback}
        steps={steps}
        hideCloseButton={true}
        showProgress
        continuous
      />
      <Grid container spacing={3}>
        <Grid item lg={10}>
          <div className="margin-top-4em margin-left-2em">
            <TextField
              id="filled-basic"
              label="Trip Name"
              value={myTripName}
              onChange={handleChange}
              variant="filled"
              autoFocus
              required
              className="trip-name-textfield"
            />
          </div>
        </Grid>
        <Grid
          item
          lg={2}
          justifyContent="flex-end"
          className="button-container"
        >
          <div className="button-margin">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleClick}
              startIcon={<SaveIcon />}
              disabled={!myTripName || !myEvents.length}
              className="save-button-here"
            >
              Save
            </Button>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} m={12} lg={5}>
          <Wishlist
            className="My-planner-wishlist-container"
            handleDragStart={handleDragStart}
            wishlist={props.wishlist}
          />
        </Grid>
        <Grid item xs={12} m={12} lg={7}>
          <section>
            <h1 className="Calendar-title">Trip Calendar</h1>
            <Calendar
              onDropFromOutside={onDropFromOutside}
              dragFromOutsideItem={dragFromOutsideItem}
              newEvent={newEvent}
              customOnDragOver={customOnDragOver}
              myEvents={myEvents}
              resizeEvent={resizeEvent}
              moveEvent={moveEvent}
              trip={props.trip}
              onSelectEvent={onSelectEvent}
            />
          </section>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    originalWishlist: state.originalWishlist,
    wishlist: state.wishlist,
    trip: state.singleTrip,
    id: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  createTrip: (trip) => dispatch(createTrip(trip, history)),
  updateTrip: (trip) => dispatch(updateTrip(trip, history)),
  getWishlist: (id) => dispatch(fetchWishlist(id)),
  getSingleTrip: (id) => dispatch(fetchSingleTrip(id)),
  removeActivityFromCalendar: (activity) =>
    dispatch(removeActivityFromCalendar(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrip);
