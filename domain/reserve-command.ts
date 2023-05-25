import { BusinessHour, CloseOfBusinessHour } from "./types";

export type ReservationStart = {
    at: BusinessHour
    date: Date
};

export type ReservationEnd = {
    at: BusinessHour | CloseOfBusinessHour
    date: Date
};

export type ReservationInterval = {
    from: ReservationStart;
    to: ReservationEnd;
}

export type Reserve = ReservationInterval & {
    type: 'reserve';
    id?: string;
    reserverName: { firstName: string, lastName: string }
};

export type CancelReservation = {
    type: 'cancelReservation';
    reservationId: string;
};