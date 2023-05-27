import { NewReservation, ReservedDayReadModel, ReservedHourReadModel } from "./types";


export type ReservationRepository = {
    add: (reservation: NewReservation) => Promise<void>;
    forTheSameMonthAs: (month:Date) => Promise<ReservedDayReadModel[]>;
    on: (day: Date) => Promise<ReservedHourReadModel[]>;
    clear: () => Promise<void>
};