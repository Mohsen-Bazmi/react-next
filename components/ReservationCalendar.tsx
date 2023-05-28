'use client'
import { NumberOfHoursPerDay, Reservation, ReservedHoursPerDay } from "@/domain/types";
import { useContext, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import { DateCell } from "./DateCell";
import { DateContext } from "./DateContext";


const numberOfReservationsOn = (e: any): NumberOfHoursPerDay =>
    Math.floor(Math.random() * 9) as NumberOfHoursPerDay;
export const ReservationCalendar = ({ }) => {
    const { selectedDate, selectDate } = useContext(DateContext);


    return <div className="text-gray-800 bg-gree pb-4">
        <Calendar
            onActiveStartDateChange={v => alert(v.activeStartDate)}
            onChange={date => {
                if (date instanceof Date)
                    selectDate({ date, numberOfHours: numberOfReservationsOn(date) })
            }}
            value={selectedDate.date}

            tileContent={
                ({ activeStartDate, date, view }) =>
                    <DateCell count={numberOfReservationsOn(date)} />}

            tileClassName="relative" />
        <Tooltip id="reserved-hours-for-day" />
    </div>


}