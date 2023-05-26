import { createReservation } from "@/domain/reservation-factory";
import { CancelReservation, Reserve } from "@/domain/reserve-command";
import { ReservedHour } from "@/domain/types";
import { getReservationRepository } from "@/lib/dependencies";
import { log } from "console";

type CommandHandler = (command: Reserve | CancelReservation) => Promise<void>;
// To allow Aspect Oriented Programming
type ReservationService = { handle: CommandHandler };

export const ReservationService: ReservationService = {
    handle: async (command: Reserve | CancelReservation) => {
        if (command.type === "reserve") {
            
            const reservation = createReservation(command);
            if (reservation instanceof Error)
                throw reservation

            await getReservationRepository().add(reservation);
        }
        else throw new Error("Not implemented.");

    }
}