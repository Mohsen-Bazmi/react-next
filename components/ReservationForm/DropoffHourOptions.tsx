import { ReservedHoursPerDay, DropoffTimesOnPickupDate, DropoffHoursNextDay } from "@/domain/types"
import { nextBusinessDayAfter } from "@/lib/date"
import { PropsWithChildren } from "react"

export const DropoffHourOptions = ({ selectedDate }: PropsWithChildren<{ selectedDate: ReservedHoursPerDay }>) => {

    const theNextDay = nextBusinessDayAfter(selectedDate.date)
    return <>
        {DropoffTimesOnPickupDate.map(h => <option key={h} data-date={selectedDate.date} value={h}>{h}</option>)}
        <optgroup label="the next day" >
            {
                DropoffHoursNextDay.map(h =>
                    <option key={h} data-date={theNextDay} value={`nextBusinessDay @ ${h}`} >
                        `${h} (The Next Business Day)`
                    </option>)
            }
        </optgroup>
    </>
}