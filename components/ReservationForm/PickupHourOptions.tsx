import { ReservedHoursPerDay, BusinessHours } from "@/domain/types";
import { PropsWithChildren } from "react";

export const PickupHourOptions = ({ selectedDate }: PropsWithChildren<{ selectedDate: ReservedHoursPerDay }>) => <>
    {BusinessHours.map(h => <option key={h} data-date={selectedDate.date} value={h}>{h}</option>)}
</>