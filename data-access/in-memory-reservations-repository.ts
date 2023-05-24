import { ReservationRepository } from "@/domain/repository";
import { NewReservation, ReservedDayReadModel, ReservedHour, ReservedHourReadModel } from "@/domain/types";

let reservations: NewReservation[] = [];
export const InMemoryReservationRepository: ReservationRepository = {
    add: (reservation: NewReservation): Promise<void> => {
        reservations.push(reservation);
        return Promise.resolve();
    },
    days: (): Promise<ReservedDayReadModel[]> => {
        const result = reservations
            .flatMap(r => r.hours)
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
    of: (day: Date): Promise<ReservedHourReadModel[]> => {
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

