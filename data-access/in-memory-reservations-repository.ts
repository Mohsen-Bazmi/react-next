import { ReservationConfilictError } from "@/domain/errors";
import { ReservationRepository } from "@/domain/reservation-repository";
import { ReservedHoursPerDay, ReservedHour, Reservation } from "@/domain/types";
import { firstDayOfMonth, lastDayOfMonth } from "@/lib/date";

export const InMemoryReservationRepository: ReservationRepository = {

    add: (reservation: Reservation): Promise<void> => {

        if (containsOverlaps(reservation))
            return Promise.reject(new ReservationConfilictError("Overlapping reservations"));

        storedReservations.push(reservation);

        return Promise.resolve();
    },


    forTheSameMonthAs: (date): Promise<ReservedHoursPerDay[]> => {
        const startOfMonth = firstDayOfMonth(date);
        const endOfMonth = lastDayOfMonth(date);

        const result = storedReservations
            .flatMap(({hours}) => hours.filter(({date}) => date > startOfMonth && endOfMonth > date))
            .reduce<ReservedHoursPerDay[]>((previousResult, curr) => {
                let group = previousResult.find(group => curr.date == group.date);
                if (!group) {
                    group = { date: curr.date, numberOfHours: 0 } as ReservedHoursPerDay;
                    previousResult.push(group);//FIX: stop mutating the argument
                }
                group.numberOfHours++
                return previousResult;
            }, []);

        return Promise.resolve(result);

    },


    on: (day) =>
        Promise.resolve(storedReservations.filter(({interval}) => interval.from.date === day)),


    clear: (): Promise<void> => {
        storedReservations = [];
        return Promise.resolve();
    }
};

let storedReservations: Reservation[] = [];




const containOverlaps = (hours: ReservedHour[]) =>
    hours.some((l, li) =>
        hours.some((r, ri) =>
            li != ri &&
            l.at == r.at &&
            l.date == r.date
        ));

const overlapsWith = (reservation: Reservation, reservations: Reservation[]) =>
    reservations.some(res =>
        res.hours.some(l => reservation.hours.some(r =>
            l.at == r.at &&
            l.date == r.date
        )));

const containsOverlaps = (newReservation: Reservation) =>
    overlapsWith(newReservation, storedReservations) ||
    containOverlaps(newReservation.hours);