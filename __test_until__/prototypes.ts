import { Reserve } from "@/domain/reserve-command";
import { NewReservation } from "@/domain/types";
import { addDays, nextFriday, nextMonday, nextSunday, subDays, subMonths, subYears } from "date-fns";

export const John = { firstName: 'John', lastName: 'Doe' };
export const monday = nextMonday(new Date(2022, 1, 15));//Keep it in the middle of the month to keep the reservations.ofMonth safe
export const today = monday;
export const friday = nextFriday(today);
export const saturday = nextSunday(today);
export const yesterday = subDays(today, 1);
export const tomorrow = addDays(today, 1);
export const theDayAfterTomorrow = addDays(tomorrow, 1);
export const lastMonthOnMonday = nextMonday(subMonths(today, 1));

export const reserveCommand: Reserve = {
    type: 'reserve',
    reserverName: John,
    from: { date: today, at: 16 },
    to: { date: tomorrow, at: 12 },
};
export const newReservation: NewReservation = {
    hours: [
        { on: today, at: 9 },
    ],
    reserver: John,
    startDate: today
}