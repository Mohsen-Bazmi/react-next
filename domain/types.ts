export const validWorkhours = [9, 10, 11, 12, 13, 14, 15, 16] as const;
export type Hour = typeof validWorkhours[number];
const isWithinWorkhours = (hour: any): hour is Hour =>
    validWorkhours.includes(hour);

type RangeOfLength<Num extends number, Result extends Array<unknown> = []> =
    Result['length'] extends Num ? Result : RangeOfLength<Num, [...Result, Result['length']]>

export type NumberOfHours = RangeOfLength<Hour>[number]



export type ReservedDayReadModel = {
    date: Date,
    numberOfHours: NumberOfHours
    // hours: ReservedHour[] for performance implications. Will get the necessary ones in a secondary rount trip
};

export type ReservedHourReadModel = ReservedHour & { reserver: string }

export type ReservedHour = {
    on: Date
    at: Hour
}

export type NewReservation = {
    id?: string
    reserver: string
    hours: ReservedHour[]
};