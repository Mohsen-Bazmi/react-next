import { zeroOfDay, dayAt, businessDayDifference } from "@/lib/date";
import { ReservationInterval } from "./reserve-command";
import { OpenOfBusiessHour, CloseOfBusiessHour } from "./types";
import { getCurrentTime as now } from "@/lib/dependencies";
import { BusinessRuleError } from "./errors";

export const validateReserveCommand = ({ from: start, to: end }: ReservationInterval): BusinessRuleError | void => {

    const startDate = zeroOfDay(start.date);
    const startTime = dayAt(startDate, start.at);
    const endDate = zeroOfDay(end.date);
    const dayDifference = businessDayDifference(endDate, startDate);

    if (start.at < OpenOfBusiessHour) return new BusinessRuleError(`Impossible to pick up earlier than ${OpenOfBusiessHour}`);
    if (end.at > CloseOfBusiessHour) return new BusinessRuleError(`Impossible to drop off after ${CloseOfBusiessHour}`);
    if (startTime < now()) return new BusinessRuleError("Impossible to reserve the car for past");
    if (dayDifference < 0) return new BusinessRuleError("Impossible to drop off before picking up");
    if (dayDifference > 1 || dayDifference === 1 && end.at > 11) return new BusinessRuleError("Impossible to drop off later than the next business day at 11");
    if (dayDifference == 0 && start.at >= end.at || startDate > endDate) return new BusinessRuleError("Impossible to drop off before picking up");
}