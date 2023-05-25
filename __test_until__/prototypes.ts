import { Reserve } from "@/usecases/reservation-service";
import { addDays } from "date-fns";

export const mohsen = { firstName: 'Mohsen', lastName: 'Bazmi' };
export const today = new Date(Date.now());
export const tomorrow = addDays(today, 1);
export const reserveCommand: Reserve = {
    type: 'reserve',
    for: mohsen,
    from: { date: today, at: 9 },
    to: { date: tomorrow, at: 11 },
};
