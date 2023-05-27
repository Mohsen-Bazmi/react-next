import { A } from "@/__test_until__/cloner";
import { lastMonthOnMonday, reserveCommand, today, tomorrow } from "@/__test_until__/prototypes";
import { InMemoryReservationRepository } from "@/data-access/in-memory-reservations-repository";
import { PrismaReservationRepository } from "@/data-access/prisma-reservation-repository";
import { CancelReservation } from "@/domain/reserve-command";
import { ReservedDayReadModel } from "@/domain/types";
import { setCurrentTime } from "@/lib/dependencies";
import { setReservationRepository } from "@/lib/dependencies";
import { ReservationService } from "@/usecases/reservation-service";

describe.each([
    // PrismaReservationRepository,// => turns it into an integration test
    InMemoryReservationRepository
])('reservation service', (repository) => {

    beforeEach(() => setReservationRepository(repository));
    beforeAll(() => setCurrentTime(lastMonthOnMonday));
    afterEach(repository.clear);

    it('reserves the car', async () => {
        const reserve = A(reserveCommand, {
            from: { date: today, at: 9 },
            to: { date: tomorrow, at: 10 },
        });

        await ReservationService.handle(reserve);

        expect(await repository.days()).toContainEqual(<ReservedDayReadModel>{
            date: today,
            numberOfHours: 8
        });
    });

    //The error branch is handled by the type system. => Donesn't need a test

    it.skip('cancels reservations', () => {

        const command: CancelReservation = {
            type: 'cancelReservation',
            reservationId: ''
        };

        ReservationService.handle(command);

    });
})