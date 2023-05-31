import { Reserve } from "@/domain/reserve-command"
import { PropsWithChildren } from "react"

export const ReservationsTableBody = ({ reservations }: PropsWithChildren<{ reservations: Reserve[] }>) => {
    return <tbody>
        {reservations.map(({ reserver, from, to }) => <tr key={reserver.firstName + reserver.lastName}
            className="">
            <td >{reserver.firstName} {reserver.lastName}</td>
            <td>-</td>
            <td>{new Date(from.date).toLocaleDateString()} {from.at}</td>
            <td>→</td>
            <td>{new Date(to.date).toLocaleDateString()} {to.at}</td>
        </tr>)}
    </tbody>
}