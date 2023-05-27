import { ReservationInterval, Reserver } from "./types";

export type Reserve = {
    type: 'reserve';
    reserver: Reserver
} & ReservationInterval;

export type CancelReservation = {
    type: 'cancelReservation';
    reservationId: string;
};