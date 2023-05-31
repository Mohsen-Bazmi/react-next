import { Reserve } from "@/domain/reserve-command"
import { NumberOfHoursPerDay, Reservation, ReservedHoursPerDay } from "@/domain/types";
import { QueryFunctionContext } from "react-query";

export const postReservation = async (reserve: Reserve) => {
    const res = await fetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify(reserve),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const body = await res.json();

    if (!res.ok) {
        throw body
    }
    return body;
}

export const reservationsOfMonth = async (date: Date): Promise<{ [date: string]: NumberOfHoursPerDay }> => {
    if (!date) {
        return {};
    }
    const res = await fetch(`/api/reservations/month/${date.toDateString()}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const body = await res.json();

    if (!res.ok) {
        throw body
    }

    return ((body ?? []) as ReservedHoursPerDay[])
        .reduce((hashtable, h) => ({
            ...hashtable,
            [new Date(h.date).toLocaleDateString()]: h.numberOfHours
        }), {} as { [date: string]: NumberOfHoursPerDay })
}

export const reservationsOfDay = async (date: Date): Promise<Reserve[]> => {
    const res = await fetch(`/api/reservations/day/${date.toDateString()}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const body = await res.json();

    if (!res.ok) {
        throw body
    }
    return body;
    // ((body ?? []) as Reserve[]).map((r) => 
    //             {r.reservationId}
    //             {r.reserver.firstName} {r.reserver.lastName}
    //             {new Date(r.from.date).toLocaleDateString()} {r.from.at}
    //             {new Date(r.to.date).toLocaleDateString()} {r.to.at}
    //         )}
}