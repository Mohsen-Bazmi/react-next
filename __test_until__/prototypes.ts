import { Reserve } from "@/domain/reserve-command";
import { BusinessHours, CloseOfBusiessHour, OpenOfBusinessHour, ReservationInterval } from "@/domain/types";
import { Reservation, ReservationEnd, ReservedHour } from "@/domain/types";
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
    reserver: John,
    from: { date: today, at: 16 },
    to: { date: tomorrow, at: 11 },
};
export const todayAt9am: ReservedHour = { date: today, at: OpenOfBusinessHour };
export const todayAt4pm: ReservedHour = { date: today, at: OpenOfBusinessHour };
export const todayAt5Pm: ReservationEnd = { date: today, at: CloseOfBusiessHour };
export const todayFrom9To5pm: ReservationInterval = {
    from: todayAt9am,
    to: todayAt5Pm
}
export const fullDayToday = {
    interval: todayFrom9To5pm,
    hours: BusinessHours.map(h => ({ date: today, at: h }))
}
export const newReservation: Reservation = {
    ...fullDayToday,
    reserver: John,
}