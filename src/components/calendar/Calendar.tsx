import {Calendar as LibCalendar}from 'react-calendar';
import { useState, useContext } from 'react';
import { AppointmentContext } from '../../context/appoint/AppointContext';
import 'react-calendar/dist/Calendar.css';
import "./calendar.scss";

function Calendar() {
	const {Calendar, setCalendr} = useContext(AppointmentContext)

	return <LibCalendar value={Calendar} onChange={(value) => {
		setCalendr(value);
	}} selectRange/>;
}

export default Calendar;
