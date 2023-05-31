'use client'
import { useContext, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import { DateCell } from "./DateCell";
import { DateContext } from "../DateContext";
import { useReservationsPerMonth } from "./hooks";



export const ReservationCalendar = ({ }) => {
    
    const { selectedDate, selectDate } = useContext(DateContext);
    const [selectedMonth, setSelectedMonth] = useState(new Date);
    const hourPerDay = useReservationsPerMonth(selectedMonth);


    return <>
        <Calendar className="text-gray-800 bg-gree pb-4 h-80"
            onActiveStartDateChange={month =>
                setSelectedMonth(month.activeStartDate ?? new Date())
            }
            onChange={date => {
                if (date instanceof Date)
                    selectDate({ date, numberOfHours: hourPerDay[date.toLocaleDateString()] ?? 0 })
            }}
            value={selectedDate.date}

            tileContent={({ date }) => <DateCell count={hourPerDay[date.toLocaleDateString()] ?? 0} />}

            tileClassName="relative" />
        <Tooltip id="reserved-hours-for-day" />
    </>


}