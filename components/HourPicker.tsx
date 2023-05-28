import { BusinessHour, CloseOfBusinessHour } from "@/domain/types"
import { Hour } from "./HourButton"

export const HourPicker = ({ label, options }: { label: string, options: readonly number[] }) => {
    return <>
        <label>{label}</label>
        <div className='flex justify-between flex-row font-mono text-white text-sm font-bold leading-6'>
            {options.map(hour =>
                <Hour key={hour}
                    hour={hour}
                    isFree={true} />)}
        </div>
    </>
}
