import { differenceInBusinessDays, startOfDay, addHours, isSameDay, isWeekend, addDays, nextMonday, startOfMonth, endOfMonth, subDays, addMonths } from "date-fns";

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
export const theMondayAfter = nextMonday;


export const firstDayOfMonth = startOfMonth
export const lastDayOfMonth = endOfMonth


export const lastDayOfLastMonth = (date: Date) =>
    subDays(firstDayOfMonth(date), 1);

export const firstDayOfNextMonth = (date: Date) =>
    theDayAfter(lastDayOfMonth(date));

export const nextMonth = (date: Date) =>
    addMonths(date, 1)