'use client'
import { NumberOfHoursPerDay, Reservation, ReservedHoursPerDay } from "@/domain/types";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import { DateCell } from "./DateCell";
import { array } from "ts-pattern/dist/patterns";

const defaultReservationsOfDay: Reservation[] = Array(8).fill(
    {
        hours: [],
        reserver: { firstName: "John", lastName: "Doe" },
        interval: {
            from: { date: new Date(), at: 9 },
            to: { date: new Date(2022), at: 10 },
        }
    })
const numberOfReservationsOn = (e: any): NumberOfHoursPerDay =>
    Math.floor(Math.random() * 9) as NumberOfHoursPerDay;
export const ReservationReport = ({ }) => {
    const [selectedDate, selectDate] = useState(new Date());

    const [reservationsOfDay, setReservationsOfDay] = useState(defaultReservationsOfDay);

    return <div className="flex flex-col md:flex-row flex-wrap justify-around">
        <div className="text-gray-800 bg-gree pb-4">
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
            <table className="leading-7">
                <thead>
                    <tr>
                        <th>Name</th>
                        <td>-</td>
                        <th>From</th>
                        <td>→</td>
                        <th>To</th>
                    </tr>
                </thead>
                <tbody>
                    {reservationsOfDay.map((r, i) => <tr key={r.reserver.firstName + r.reserver.lastName}>
                        <td>{r.reserver.firstName} {r.reserver.lastName}</td>
                        <td>-</td>
                        <td>{r.interval.from.date.toLocaleDateString()} {r.interval.from.at}</td>
                        <td>→</td>
                        <td>{r.interval.to.date.toLocaleDateString()} {r.interval.to.at}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
}