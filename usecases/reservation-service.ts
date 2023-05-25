import { Hour, ReservedHour } from "@/domain/types";
import { getReservationRepository } from "@/lib/dependencies";

type WorkhourDto = {
    at: Hour
    date: Date
};

export type Reserve = {
    type: 'reserve';
    id?: string;
    for: { firstName: string, lastName: string }
    from: WorkhourDto;
    to: WorkhourDto;
};

export type CancelReservation = {
    type: 'cancelReservation';
    ReservationId: string;
};

type CommandHandler = (command: Reserve | CancelReservation) => Promise<void>;
// To allow Aspect Oriented Programming
type ReservationService = { handle: CommandHandler };

export const ReservationService: ReservationService = {
    handle: async (command) => {
        if (command.type === "reserve") {
            const repository = getReservationRepository();
            const hours = [
                {
                    on: command.from.date,
                    at: command.from.at
                } as ReservedHour
            ];


            await repository.add({
                hours,
                reserver: command.for,
                id: command.id
            });
        }
        else throw new Error("Not implemented.");

    }
}