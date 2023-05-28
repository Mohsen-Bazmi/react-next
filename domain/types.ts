import { CustomizeEach, RangeOfLength } from "@/lib/types";

export const BusinessHours = [9, 10, 11, 12, 13, 14, 15, 16] as const;
export type BusinessHour = typeof BusinessHours[number];

export const OpenOfBusinessHour = BusinessHours[0];
export type OpenOfBusinessHour = typeof OpenOfBusinessHour;

export const CloseOfBusiessHour = 17;
export type CloseOfBusinessHour = typeof CloseOfBusiessHour;

export type PickupHour = BusinessHour;

export const DropoffTimesOnPickupDate = [...BusinessHours, CloseOfBusiessHour] as const
type DropoffTimeOnPickupDate = typeof DropoffTimesOnPickupDate[number]

export const DropoffHoursNextDay = [9, 10, 11] as const

export const ReservationDeadline = 11;

export type NumberOfHoursPerDay = RangeOfLength<DropoffTimeOnPickupDate>[number];

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
