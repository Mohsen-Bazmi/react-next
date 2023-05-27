import { NewReservation, OpenOfBusiessHour, CloseOfBusiessHour, BusinessHour, ReservedHour } from "@/domain/types";
import { ReservationInterval, Reserve } from "./reserve-command";
import { areTheSameDay, isTomorrowOf } from "@/lib/date";
import { validateReserveCommand } from "./rules";
import { log } from "console";

function* hoursBetween(from: BusinessHour, to: number): Generator<BusinessHour> {
    for (let at = from; at < to; at++)
        yield at;
}

function* generateReservedHours({ from: start, to: end }: ReservationInterval): Generator<ReservedHour> {

    if (areTheSameDay(start.date, end.date)) {

        for (const hour of hoursBetween(start.at, end.at))
            yield { at: hour, on: start.date };

        return;
    }
    log({ sameday:areTheSameDay(start.date, end.date) })

    const today = hoursBetween(start.at, CloseOfBusiessHour)
    for (const at of today)
        yield { at, on: start.date };

    const tomorrow = hoursBetween(OpenOfBusiessHour, end.at)
    for (const at of tomorrow)
        yield { at, on: end.date };

}


export const createReservation = (cmd: Reserve): NewReservation | Error => {

    const errors = validateReserveCommand(cmd);
    if (errors) return errors;
    
    return {
        reserver: cmd.reserverName,
        startDate: cmd.from.date,
        hours: [...generateReservedHours(cmd)]
    }
}




// Before The final refactor:
// function generateReservedHours(cmd: Reserve) {

//     if (isTheDayAfter(cmd.to.date, cmd.from.date)) {


//         const hoursOfFirstDay = Array.from(hoursBetween(cmd.from.at, CloseOfBusiessHour));
//         const hourOfSecondDay = Array.from(hoursBetween(OpenOfBusiessHour, cmd.to.at));

//         return hoursOfFirstDay.map(at => ({ on: cmd.from.date, at }))
//             .concat(hourOfSecondDay.map(at => ({ on: cmd.to.date, at })));
//     }


//     const hours = Array.from(hoursBetween(cmd.from.at, cmd.to.at))
//     return hours.map(at => ({ on: cmd.from.date, at }));

// }