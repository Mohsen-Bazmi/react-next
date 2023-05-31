import { reservationsOfDay } from "@/api-client/reservation-api";
import { Reserve } from "@/domain/reserve-command";
import { ReservedHoursPerDay } from "@/domain/types";
import { useState, useEffect } from "react";

export const useUserReservations = (selectedDate: ReservedHoursPerDay) => {
    const [reservations, setReservations] = useState<Reserve[]>([]);

    useEffect(() => {
        reservationsOfDay(selectedDate.date).then(setReservations);
    }, [selectedDate]);
    return reservations;
}