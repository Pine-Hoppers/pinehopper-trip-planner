import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: props.trip.activities.map((activity) => ({
        start: activity.dateOfActivity,
        end: activity.dateOfActivity,
        title: activity.activity_name,
      })),
    };

    this.moveEvent = this.moveEvent.bind(this);
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents,
    });
  }

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  render() {
    return (
      <div className="calendar-container">
        <h1>{this.props.trip.tripName}</h1>
        <DragAndDropCalendar
          selectable
          defaultDate={this.props.trip.startDate}
          defaultView="month"
          events={this.state.events}
          onEventDrop={this.moveEvent}
          resizable
          localizer={localizer}
          onEventResize={this.onEventResize}
        />
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    trip: state.singleTrip,
  };
};

export default connect(mapState, null)(Dnd);
