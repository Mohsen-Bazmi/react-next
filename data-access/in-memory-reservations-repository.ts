import { ReservationConfilictError } from "@/domain/errors";
import { ReservationRepository } from "@/domain/reservation-repository";
import { NewReservation, ReservedDayReadModel, ReservedHour, ReservedHourReadModel } from "@/domain/types";
import { firstDayOfMonth, lastDayOfMonth } from "@/lib/date";

export const InMemoryReservationRepository: ReservationRepository = {

    add: (reservation: NewReservation): Promise<void> => {

        if (containsOverlaps(reservation))
            return Promise.reject(new ReservationConfilictError("Overlapping reservations"));

        reservations.push(reservation);

        return Promise.resolve();
    },
    forTheSameMonthAs: (date): Promise<ReservedDayReadModel[]> => {
        const startOfMonth = firstDayOfMonth(date);
        const endOfMonth = lastDayOfMonth(date);

        const result = reservations
            .flatMap(r => r.hours.filter(h => h.on > startOfMonth && endOfMonth > h.on))
            .reduce<ReservedDayReadModel[]>((previousResult, curr) => {
                let group = previousResult.find(group => curr.on == group.date);
                if (!group) {
                    group = { date: curr.on, numberOfHours: 0 } as ReservedDayReadModel;
                    previousResult.push(group);//TODO: stop mutating the argument
                }
                group.numberOfHours++
                return previousResult;
            }, []);

        return Promise.resolve(result);

    },
    on: (day: Date): Promise<ReservedHourReadModel[]> => {
        const result: ReservedHourReadModel[] =
            reservations.flatMap(r =>
                r.hours.map(h => ({
                    at: h.at,
                    on: h.on,
                    reserver: r.reserver,
                }))).filter(r => r.on = day);

        return Promise.resolve(result);
    },
    clear: (): Promise<void> => {
        reservations = [];
        return Promise.resolve();
    }
};

let reservations: NewReservation[] = [];




const containOverlaps = (hours: ReservedHour[]) =>
    hours.some((l, li) =>
        hours.some((r, ri) =>
            li != ri &&
            l.at == r.at &&
            l.on == r.on
        ));

const overlapsWith = (reservation: NewReservation, reservations: NewReservation[]) =>
    reservations.some(res =>
        res.hours.some(l => reservation.hours.some(r =>
            l.at == r.at &&
            l.on == r.on
        )));

const containsOverlaps = (reservation: NewReservation) =>
    overlapsWith(reservation, reservations) ||
    containOverlaps(reservation.hours);