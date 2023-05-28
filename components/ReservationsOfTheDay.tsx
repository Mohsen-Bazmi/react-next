'use client'
import { useContext, useEffect, useState } from "react"
import { DateContext } from "./DateContext"
import { Reservation } from "@/domain/types"

const defaultReservationsOfDay: Reservation[] = Array(8).fill(
    {
        hours: [],
        reserver: { firstName: "John", lastName: "Doe" },
        interval: {
            from: { date: new Date(), at: 9 },
            to: { date: new Date(2022), at: 10 },
        }
    })
export const ReservationsOfTheDay = () => {
    const { selectedDate } = useContext(DateContext)
    const [reservationsOfDay, setReservationsOfDay] = useState(defaultReservationsOfDay);

    useEffect(() => {
        console.log(selectedDate)
    }, [selectedDate])
    return <table className="leading-7">
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
}