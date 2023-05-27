import { differenceInBusinessDays, startOfDay, addHours, isSameDay, isWeekend, addDays, nextMonday } from "date-fns";

export const isTomorrowOf = (left: Date, right: Date) =>
    businessDayDifference(zeroOfDay(right), zeroOfDay(left)) == 1

export const areTheSameDay = (left: Date, right: Date) =>
    isSameDay(left, right)

export const businessDayDifference = (left: Date, right: Date) =>
    differenceInBusinessDays(zeroOfDay(left), zeroOfDay(right));

export const zeroOfDay = startOfDay;

export const dayAt = addHours

export const isAWeekend = isWeekend

export const daysAfter = addDays
export const theDayAfter = (date: Date) => daysAfter(date, 1);
export const twoDaysAfter = (date: Date) => daysAfter(date, 2);
export const theMondayAfter = (date: Date) => nextMonday(date);