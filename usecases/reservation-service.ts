type WorkhourDto = {
    at: number
    date: Date
};

export type Reserve = {
    command: 'reserve';
    id?: string;
    reservedBy: string
    From: WorkhourDto;
    To: WorkhourDto;
};

export type CancelReservation = {
    command: 'cancelReservation';
    ReservationId: string;
};

export type Command = Reserve | CancelReservation;
type CommandTypes = 'reserve' | 'cancelReservation';

type CommandHandler = (command: Command) => Promise<void>;
// To allow for Aspect Oriented Programming
type ReservationService = { handle: CommandHandler };

export const ReservationService: ReservationService = {
    handle: (command) => {
        throw new Error("Function not implemented.");
    }
}