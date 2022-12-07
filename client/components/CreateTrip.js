import React, { useCallback, useState, useEffect } from 'react';
import Calendar from './DnDCalendar';
import Wishlist from './Wishlist';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { createTrip, updateTrip } from '../store/alltrips';
import { fetchWishlist } from '../store/wishlist';
import { fetchSingleTrip } from '../store/singleTrip';

/**
 * COMPONENT
 */
export const CreateTrip = (props) => {
  const [myTripName, setTripName] = useState();
  const [myEvents, setMyEvents] = useState();

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
        endDate: myEvents[myEvents.length - 1].end,
        activities: matchActivities,
      });
    }
    if (props.match.params.mode === 'edit') {
      props.updateTrip({
        id: props.trip.id,
        tripName: myTripName,
        startDate: myEvents[0].start,
        endDate: myEvents[myEvents.length - 1].end,
        activities: matchActivities,
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
        const idList = prev.map((item) => item.id);
        const newId = Math.max(...idList) + 1;
        return [...prev, { ...event, id: newId }];
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

      const { name } = draggedEvent;
      const event = {
        title: name,
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
        console.log('preventDefault');
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

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item lg={11}>
          <TextField
            id="filled-basic"
            label="Trip Name"
            value={myTripName}
            onChange={handleChange}
            variant="filled"
            autoFocus
            required
          />
        </Grid>
        <Grid item lg={1}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleClick}
            startIcon={<SaveIcon />}
            disabled={!myTripName}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} m={12} lg={3}>
          <Wishlist
            handleDragStart={handleDragStart}
            wishlist={props.wishlist}
          />
        </Grid>
        <Grid item xs={12} m={12} lg={9}>
          <Calendar
            onDropFromOutside={onDropFromOutside}
            dragFromOutsideItem={dragFromOutsideItem}
            newEvent={newEvent}
            customOnDragOver={customOnDragOver}
            myEvents={myEvents}
            resizeEvent={resizeEvent}
            moveEvent={moveEvent}
            trip={props.trip}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrip);
