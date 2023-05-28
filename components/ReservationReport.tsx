'use client'
import { NumberOfHoursPerDay, Reservation, ReservedHoursPerDay } from "@/domain/types";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import { DateCell } from "./DateCell";

export const ReservationReport = ({}) => {
    const [selectedDate, selectDate] = useState(new Date());
    const numberOfReservationsOn = (e: any): NumberOfHoursPerDay =>
        Math.floor(Math.random() * 9) as NumberOfHoursPerDay;

    const reservationsOfDay:Reservation[] = [
        
    ]

    return <div className="flex flex-col">
        <div className="text-gray-800 bg-gree">
            <Calendar
                onActiveStartDateChange={v => alert(v.activeStartDate)}
                onChange={(v, e) => alert(v)}
                value={selectedDate}
                
                tileContent={
                    ({ activeStartDate, date, view }) =>
                    <DateCell count={numberOfReservationsOn(date)} />}
                    
                tileClassName="relative" />
            <Tooltip id="reserved-hours-for-day" />
        </div>
        <div>
            
        </div>
    </div>
}