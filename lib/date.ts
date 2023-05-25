import { differenceInBusinessDays, startOfDay, addHours } from "date-fns";

export const isTomorrowOf = (left: Date, right: Date) =>
    businessDayDifference(zeroOfDay(right), zeroOfDay(left)) == 1
    
export const areTheSameDay = (left: Date, right: Date) =>
    businessDayDifference(zeroOfDay(right), zeroOfDay(left)) == 0

export const businessDayDifference = (left: Date, right: Date) =>
    differenceInBusinessDays(left, right);

export const zeroOfDay = startOfDay;

export const dayAt = addHours