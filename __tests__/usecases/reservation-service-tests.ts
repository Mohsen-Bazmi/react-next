import { InMemoryReservationRepository } from "@/data-access/in-memory-reservations-repository";
import { ReservedDayReadModel } from "@/domain/types";
import { setReservationRepository } from "@/lib/dependencies";
import { ReservationService, Reserve } from "@/usecases/reservation-service";

describe('reservation service', () => {
    const repository = InMemoryReservationRepository
    beforeEach(() => setReservationRepository(repository));
    afterEach(repository.clear);

    it('reserves the car', async () => {
        const today = new Date();

        const command: Reserve = {
            type: 'reserve',
            reservedBy: 'Mohsen',
            From: { date: today, at: 9 },
            To: { date: today, at: 10 },
        };

        await ReservationService.handle(command);

        expect(await repository.days()).toContainEqual({
            date: today,
            numberOfHours: 1
        });
    });

    //     it('cancels reservations', () => {

    //         const command: CancelReservation = {
    //             CommandType: 'cancelReservation',
    //             ReservationId: ''
    //         };

    //         ReservationService.handle(command);

    //         expect(true).toBeTruthy();

    //     });
})