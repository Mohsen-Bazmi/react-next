import { BusinessHours } from "@/domain/types"
import { Hour } from "./HourButton"

export const HourPicker = () => {
    return <>
        <label>At</label>
        <div className='flex flex-row font-mono text-white text-sm font-bold leading-6'>
            {BusinessHours.map(hour => <Hour key={hour} hour={hour} isFree={false} />)}
        </div>
    </>
}
