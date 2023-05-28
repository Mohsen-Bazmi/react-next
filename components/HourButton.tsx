import { BusinessHour, CloseOfBusinessHour, DropoffHour } from "@/domain/types";


export type HourProps = {
    text: any
    value?: any
};
export const Hour = ({ text }: HourProps) => {
    let classes = "border-white disabled hover:border-2 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg";
    // if (!isFree) {
    classes += " focus:outline-none disabled:opacity-25 text-gray-800 border-gray-800";
    // }

    return <button className={classes}>{text}</button>;
}