import { NumberOfHoursPerDay } from "@/domain/types";

export const DateCell = ({ count }: { count: NumberOfHoursPerDay }) =>
    <div data-tooltip-id="reserved-hours-for-day"
        data-tooltip-content={count.toString()}
        className={classNamesFor(count) + " absolute top-0 left-0 w-full h-full bg-opacity-50"}>
    </div>

const classNamesFor = (count: NumberOfHoursPerDay): string => {
    // "bg-green-" + count+2 * 100;
    switch (count) {
        case 0: return "";
        case 1: return "bg-green-200";
        case 2: return "bg-green-300";
        case 3: return "bg-green-400";
        case 4: return "bg-green-500";
        case 5: return "bg-green-600";
        case 6: return "bg-green-700";
        case 7: return "bg-green-800";
        case 8: return "bg-green-900";
    }
}