import { A } from "@/__test_until__/cloner";
import { reserveCommand } from "@/__test_until__/prototypes";
import { InMemoryReservationRepository } from "@/data-access/in-memory-reservations-repository";
import { setReservationRepository } from "@/lib/dependencies";
import { ReservationService } from "@/usecases/reservation-service";
import { addDays } from 'date-fns';

describe('reservation service', () => {
    const repository = InMemoryReservationRepository
    beforeEach(() => setReservationRepository(repository));
    afterEach(repository.clear);

    it('reserves the car', async () => {
        const today = new Date();
        const tomorrow = addDays(today, 1);

        const reserve = A(reserveCommand, {
            from: { date: today, at: 9 },
            to: { date: tomorrow, at: 11 },
        });

        await ReservationService.handle(reserve);

        expect(await repository.days()).toContainEqual({
            date: today,
            numberOfHours: 10
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