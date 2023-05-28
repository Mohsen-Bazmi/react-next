import { Hour } from "./HourButton"

export type HourPickerProps = {
    label: string,
    options: readonly any[]
}

export const HourPicker = ({ label, options }: HourPickerProps) => {
    return <>
        <label>{label}</label>
        <div className='flex justify-between flex-row font-mono text-white text-sm font-bold leading-6'>
            {options.map(hour =>
                <Hour key={hour}
                    text={hour} />)}
        </div>
    </>
}
