export const BusinessHours = [9, 10, 11, 12, 13, 14, 15, 16] as const;
export const OpenOfBusiessHour = 9;
export const CloseOfBusiessHour = 17;

export type BusinessHour = typeof BusinessHours[number];
export type OpenOfBusinessHour = 9;
export type CloseOfBusinessHour = 17;
const isBusinessHour = (hour: any): hour is BusinessHour =>
    BusinessHours.includes(hour);
const isWithinClosedBusinessHoursInterval = (hour: any): hour is BusinessHour | CloseOfBusinessHour =>
    [...BusinessHours, CloseOfBusiessHour].includes(hour);

type RangeOfLength<Num extends number, Result extends Array<unknown> = []> =
    Result['length'] extends Num ? Result : RangeOfLength<Num, [...Result, Result['length']]>

export type NumberOfHoursPerDay = RangeOfLength<BusinessHour>[number]



export type ReservedDayReadModel = {
    date: Date,
    numberOfHours: NumberOfHoursPerDay
    // hours: ReservedHour[] for performance implications. Will get the necessary ones in a secondary rount trip
};

export type ReservedHourReadModel = ReservedHour & { reserver: Reserver }

export type ReservedHour = {
    on: Date
    at: BusinessHour
}
export type Reserver = {
    firstName: string
    lastName: string
}
export type NewReservation = {
    reserver: Reserver
    hours: ReservedHour[]
    startDate: Date
};