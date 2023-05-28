import { RangeOfLength } from "@/lib/types";

export const BusinessHours = [9, 10, 11, 12, 13, 14, 15, 16] as const;
export type BusinessHour = typeof BusinessHours[number];

export type OpenOfBusinessHour = 9;
export const OpenOfBusinessHour = 9;

export const CloseOfBusiessHour = 17;
export type CloseOfBusinessHour = 17;

export type NumberOfHoursPerDay = RangeOfLength<BusinessHour>[number];


export type ReservedHour = {
    date: Date
    at: BusinessHour
}

export type ReservationStart = ReservedHour;

export type ReservationEnd = Omit<ReservationStart, 'at'> & {
    at: BusinessHour | CloseOfBusinessHour
};

export type ReservationInterval = {
    from: ReservationStart;
    to: ReservationEnd;
}

export type Reserver = {
    firstName: string
    lastName: string
}

export type Reservation = {
    reserver: Reserver
    hours: ReservedHour[]
    interval: ReservationInterval
};

export type ReservedHoursPerDay = {
    date: Date,
    numberOfHours: NumberOfHoursPerDay
};
