import React, { useCallback, useState } from 'react';
import Calendar from './DnDCalendar';
import Wishlist from './Wishlist';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const CreateTrip = (props) => {
  const [myEvents, setMyEvents] = useState(
    props.trip.activities.map((activity) => ({
      start: activity.dateOfActivity,
      end: activity.dateOfActivity,
      title: activity.activity_name,
      isDraggable: true,
    }))
  );
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
      <Wishlist handleDragStart={handleDragStart} />
      <button>Save</button>
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trip: state.singleTrip,
  };
};

export default connect(mapStateToProps, null)(CreateTrip);
