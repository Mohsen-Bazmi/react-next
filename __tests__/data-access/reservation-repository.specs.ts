
import { InMemoryReservationRepository } from "@/data-access/in-memory-reservations-repository";
import { PrismaReservationRepository } from "@/data-access/prisma-reservation-repository";
import { ReservationRepository } from "@/domain/reservation-repository";
import { NewReservation, ReservedHour, Reserver } from "@/domain/types";


describe.each([
    // PrismaReservationRepository,// cleans the data => use the containerized sand box
    InMemoryReservationRepository
])('Reservation repository', (reservations: ReservationRepository) => {

    afterEach(reservations.clear);


    it('stores reservations', async () => {
        const friday = new Date();


        await reservations.add({
            hours: [
                { on: friday, at: 9 }
            ],
            reserver: mohsen
        });


        expect(await reservations.of(friday))
            .toContainEqual({
                on: friday,
                at: 9,
                reserver: mohsen
            });
    });

    it('counts reservations of each day', async () => {
        const friday = new Date();
        const saturday = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await reservations.add({
            hours: [
                { on: friday, at: 9 },
                { on: friday, at: 10 },
                { on: friday, at: 11 },
                { on: saturday, at: 9 },
                { on: saturday, at: 10 },
            ],
            reserver: mohsen
        });

        const days = await reservations.days();

        expect(days).toContainEqual({
            date: friday,
            numberOfHours: 3
        });

        expect(days).toContainEqual({
            date: saturday,
            numberOfHours: 2
        });
    });



    it(`rejects reservations that contain overlaps`, async () => {

        const friday = new Date();
        const duplicateHours: ReservedHour = { on: friday, at: 9 }
        const reservation: NewReservation = {
            hours: [
                duplicateHours,
                duplicateHours,
            ],
            reserver: mohsen
        }

        await expect(() => reservations.add(reservation)).rejects.
            toThrowError("Overlapping reservations");

    });

    it(`rejects reservations that overlap existing ones`, async () => {

        const friday = new Date();
        const theSameReservation: NewReservation = {
            hours: [
                { on: friday, at: 9 },
            ],
            reserver: mohsen
        }
        await reservations.add(theSameReservation);

        await expect(() => reservations.add(theSameReservation)).rejects
            .toThrowError("Overlapping reservations");

    });


    const mohsen: Reserver = { firstName: 'Mohsen', lastName: 'Bazmi' };
})