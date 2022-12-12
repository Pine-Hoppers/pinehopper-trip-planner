import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

function Dnd(props) {
  return (
    <div className="calendar-container">
      <h1>{props.trip.tripName}</h1>
      <DragAndDropCalendar
        resizable
        dragFromOutsideItem={props.dragFromOutsideItem}
        onDropFromOutside={props.onDropFromOutside}
        onDragOver={props.customOnDragOver}
        draggableAccessor="isDraggable"
        defaultDate={props.trip.startDate}
        defaultView="month"
        events={props.myEvents}
        onEventDrop={props.moveEvent}
        localizer={localizer}
        onEventResize={props.resizeEvent}
        onSelectEvent={props.onSelectEvent}
      />
    </div>
  );
}

export default Dnd;
