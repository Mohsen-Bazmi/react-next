import { Reservation, OpenOfBusinessHour, CloseOfBusiessHour, BusinessHour, ReservedHour, ReservationInterval } from "@/domain/types";
import { Reserve } from "./reserve-command";
import { areTheSameDay } from "@/lib/date";
import { createReservationId, validateReserveCommand } from "./rules";

function* hoursBetween(from: BusinessHour, to: number): Generator<BusinessHour> {
    for (let at = from; at < to; at++)
        yield at;
}

function* generateReservedHours({ from: start, to: end }: ReservationInterval): Generator<ReservedHour> {

    if (areTheSameDay(start.date, end.date)) {

        for (const hour of hoursBetween(start.at, end.at))
            yield { at: hour, date: start.date };

        return;
    }

    const today = hoursBetween(start.at, CloseOfBusiessHour)
    for (const at of today)
        yield { at, date: start.date };

    const tomorrow = hoursBetween(OpenOfBusinessHour, end.at)
    for (const at of tomorrow)
        yield { at, date: end.date };

}


export const createReservation = (cmd: Reserve): Reservation | Error => {

    const errors = validateReserveCommand(cmd);
    if (errors) return errors;


    return {
        id: cmd.reservationId ?? createReservationId(cmd),

        reserver: cmd.reserver,

        interval: { from: cmd.from, to: cmd.to },

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