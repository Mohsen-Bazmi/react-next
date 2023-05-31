import { reservationsOfMonth } from "@/api-client/reservation-api";
import { NumberOfHoursPerDay } from "@/domain/types";
import { useState, useEffect } from "react";

export const useReservationsPerMonth = (selectedMonth: Date) => {
    // let { data: hourPerDay, isLoading, error } = useQuery([selectedMonth], reservationsOfMonthUq);
    const [hourPerDay, setHoursPerDay] = useState<{ [date: string]: NumberOfHoursPerDay }>({});
    useEffect(() => { reservationsOfMonth(selectedMonth).then(setHoursPerDay) }, [selectedMonth]);
    return hourPerDay;
}