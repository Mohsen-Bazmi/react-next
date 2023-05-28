import { ReservedHoursPerDay, Reservation, BusinessHour } from "./types";


export type ReservationRepository = {
    add: (reservation: Reservation) => Promise<void>;
    on: (day: Date) => Promise<Reservation[]>;
    forTheSameMonthAs: (month:Date) => Promise<ReservedHoursPerDay[]>;
    // availableHoursOn(date:Date) => Promise<BusinessHour>
    clear: () => Promise<void>
};