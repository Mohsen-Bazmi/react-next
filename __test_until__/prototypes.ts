import { Reserve } from "@/domain/reserve-command";
import { NewReservation } from "@/domain/types";
import { getCurrentTime } from "@/lib/dependencies";
import { addDays, nextFriday, nextMonday, nextSaturday, nextSunday, subDays, subMonths, subYears } from "date-fns";

export const mohsen = { firstName: 'Mohsen', lastName: 'Bazmi' };
export const monday = nextMonday(getCurrentTime());
export const today = monday;
export const friday = nextFriday(today);
export const saturday = nextSunday(today);
export const yesterday = subDays(today, 1);
export const tomorrow = addDays(today, 1);
export const theDayAfterTomorrow = addDays(tomorrow, 1);
export const lastMonthOnMonday = nextMonday(subMonths(today, 1));

export const reserveCommand: Reserve = {
    type: 'reserve',
    reserverName: mohsen,
    from: { date: today, at: 16 },
    to: { date: tomorrow, at: 12 },
};
export const newReservation: NewReservation = {
    hours: [
        { on: today, at: 9 },
    ],
    reserver: mohsen,
    startDate: today
}