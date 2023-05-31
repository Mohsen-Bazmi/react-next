'use client'
import { PropsWithChildren, useContext } from "react"
import { DateContext } from "../DateContext"
import { useUserReservations } from "./hooks"
import { Reserve } from "@/domain/reserve-command"
import { ReservationsTableBody } from "./ReservationsTableBody"


export const ReservationsOfTheDay = () => {

    const { selectedDate } = useContext(DateContext)
    const reservations = useUserReservations(selectedDate);

    return <table className="leading-7 text-center  w-7/12 h-28">
        <thead>
            <tr><th >Name</th><td >-</td><th >From</th><td >→</td><th >To</th></tr>
        </thead>
        <ReservationsTableBody reservations={reservations} />
    </table>
}

