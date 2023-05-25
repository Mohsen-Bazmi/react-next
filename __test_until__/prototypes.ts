import { Reserve } from "@/domain/reserve-command";
import { NewReservation } from "@/domain/types";
import { getCurrentTime } from "@/lib/dependencies";
import { addDays, nextFriday, nextMonday, subDays, subYears } from "date-fns";

export const mohsen = { firstName: 'Mohsen', lastName: 'Bazmi' };
export const today = getCurrentTime();
export const yesterday = subDays(today, 1);
export const tomorrow = addDays(today, 1);
export const theDayAfterTomorrow = addDays(tomorrow, 1);
export const pastYear = subYears(today, 1);
export const friday = nextFriday(today);
export const monday = nextMonday(today);
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