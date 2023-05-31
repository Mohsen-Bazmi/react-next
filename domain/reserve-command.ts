import { ReservationInterval, Reserver } from "./types";

export type Reserve = {
    type: 'reserve';
    reservationId?: string,
    reserver: Reserver
} & ReservationInterval;

export type CancelReservation = {
    type: 'cancelReservation';
    reservationId: string;
};