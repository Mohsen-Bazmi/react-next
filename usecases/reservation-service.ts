import { createReservation } from "@/domain/reservation-factory";
import { CancelReservation, Reserve } from "@/domain/reserve-command";
import { getReservationRepository } from "@/lib/dependencies";

type CommandHandler = (command: Reserve | CancelReservation) => Promise<void>;
// To allow Aspect Oriented Programming
export type ReservationService = { execute: CommandHandler };

export const ReservationService: ReservationService = {
    execute: async (command: Reserve | CancelReservation) => {
        if (command.type === "reserve") {
            
            const reservation = createReservation(command);
            if (reservation instanceof Error)
                throw reservation

            await getReservationRepository().add(reservation);
        }
        else throw new Error("Not implemented.");

    }
}