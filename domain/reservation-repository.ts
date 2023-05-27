import { NewReservation, ReservedDayReadModel, ReservedHourReadModel } from "./types";


export type ReservationRepository = {
    add: (reservation: NewReservation) => Promise<void>;
    days: () => Promise<ReservedDayReadModel[]>;
    of: (day: Date) => Promise<ReservedHourReadModel[]>;
    clear: () => Promise<void>
};