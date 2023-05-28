import { ReservedHoursPerDay, Reservation } from "./types";


export type ReservationRepository = {
    add: (reservation: Reservation) => Promise<void>;
    on: (day: Date) => Promise<Reservation[]>;
    forTheSameMonthAs: (month:Date) => Promise<ReservedHoursPerDay[]>;
    clear: () => Promise<void>
};