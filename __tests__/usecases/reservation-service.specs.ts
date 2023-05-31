import { A } from "@/__test_until__/cloner";
import { friday, lastMonthOnMonday, John, reserveCommand, today, tomorrow } from "@/__test_until__/prototypes";
import { InMemoryReservationRepository } from "@/data-access/in-memory-reservations-repository";
import { PrismaReservationRepository } from "@/data-access/prisma-reservation-repository";
import { CancelReservation } from "@/domain/reserve-command";
import { Reservation } from "@/domain/types";
import { getReservationService, setCurrentTime } from "@/lib/dependencies";
import { setReservationRepository } from "@/lib/dependencies";
import { ReservationService } from "@/usecases/reservation-service";

describe.each([
    // PrismaReservationRepository,// => turns it into an integration test
    InMemoryReservationRepository
])('reservation service', (reservations) => {

    it('reserves the car', async () => {

        const reserve = A(reserveCommand, {
            from: { date: friday, at: 9 },
            to: { date: friday, at: 10 },
            reserver: John
        });

        await getReservationService().execute(reserve);
        const reservationsForToday = await reservations.on(friday);

        expect(reservationsForToday).toContainEqual(<Reservation>{
            hours: [{ date: friday, at: 9 }],
            reserver: John,
            interval: {
                from: { date: friday, at: 9 },
                to: { date: friday, at: 10 }
            },
            id: reserve.reservationId
        });

    });

    //The error branch is handled by the type system. => Donesn't need a test

    it.skip('cancels reservations', () => {

        const command: CancelReservation = {
            type: 'cancelReservation',
            reservationId: ''
        };

        ReservationService.execute(command);

    });


    beforeEach(() => setReservationRepository(reservations));
    beforeAll(() => setCurrentTime(lastMonthOnMonday));
    afterEach(reservations.clear);

})