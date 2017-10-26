import React from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css";


/* Setup the localizer by providing the moment (or globalize) Object
to the correct localizer.*/
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


const MyCalendar = props => (
  <div>
    <BigCalendar
    selectable
     {...props}
      titleAccessor= 'title'
      startAccessor="startDate"
      endAccessor="endDate"
      step={60}
      views={{month: true, agenda: true}}
      onSelectEvent = {true}  
      timeslots={8} 
      onSelectSlot = {props.slotSelected}
    />
  </div>
);

export default MyCalendar;