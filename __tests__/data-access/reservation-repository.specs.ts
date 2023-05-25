
import { A } from "@/__test_until__/cloner";
import { friday, mohsen, monday, newReservation } from "@/__test_until__/prototypes";
import { InMemoryReservationRepository } from "@/data-access/in-memory-reservations-repository";
import { PrismaReservationRepository } from "@/data-access/prisma-reservation-repository";
import { ReservationRepository } from "@/domain/reservation-repository";
import { ReservedHour } from "@/domain/types";


describe.each([
    // PrismaReservationRepository,// cleans the data => use the containerized sand box
    InMemoryReservationRepository
])('Reservation repository', (reservations: ReservationRepository) => {

    afterEach(reservations.clear);


    it('stores reservations', async () => {

        await reservations.add(A(newReservation, {
            hours: [
                { on: friday, at: 9 }
            ],
            reserver: mohsen,
            startDate: friday
        }));

        expect(await reservations.of(friday))
            .toContainEqual({
                on: friday,
                at: 9,
                reserver: mohsen
            });
    });

    it('counts reservations of each day', async () => {

        await reservations.add(A(newReservation, {
            hours: [
                { on: friday, at: 9 },
                { on: friday, at: 10 },
                { on: friday, at: 11 },
                { on: monday, at: 9 },
                { on: monday, at: 10 },
            ],
            startDate: friday
        }));

        const days = await reservations.days();

        expect(days).toContainEqual({
            date: friday,
            numberOfHours: 3
        });

        expect(days).toContainEqual({
            date: monday,
            numberOfHours: 2
        });
    });



    it(`rejects reservations that contain overlaps`, async () => {

        const duplicateHours: ReservedHour = { on: friday, at: 9 }
        const reservation = A(newReservation, {
            hours: [
                duplicateHours,
                duplicateHours,
            ]
        })

        await expect(() => reservations.add(reservation)).rejects.
            toThrowError("Overlapping reservations");

    });

    it(`rejects reservations that overlap existing ones`, async () => {

        const theSameReservation = A(newReservation)
        await reservations.add(theSameReservation);

        await expect(() => reservations.add(theSameReservation)).rejects
            .toThrowError("Overlapping reservations");

    });

})