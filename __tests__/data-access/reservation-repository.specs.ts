
import { InMemoryReservationRepository } from "@/data-access/in-memory-reservations-repository";
import { PrismaReservationRepository } from "@/data-access/prisma-reservation-repository";
import { ReservationRepository } from "@/domain/repository";
import { NewReservation, ReservedHour } from "@/domain/types";

describe.each([
    PrismaReservationRepository,// The real db clears the data => use the containerized sand box
    // InMemoryReservationRepository
])('Reservation repository', (reservations: ReservationRepository) => {

    afterEach(reservations.clear);

    it('stores reservations', async () => {
        const friday = new Date();


        await reservations.add({
            hours: [
                { on: friday, at: 9 }
            ],
            reserver: "dummy"
        });


        expect(await reservations.of(friday))
            .toContainEqual({
                on: friday,
                at: 9,
                reserver: "dummy"
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
            reserver: "dummy"
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
            reserver: "dummy"
        }

        expect(() => reservations.add(reservation)).rejects.
            toThrowError("Overlapping reservations");

    });

    it(`rejects reservations that overlap existing ones`, async () => {

        const friday = new Date();
        const theSameReservation: NewReservation = {
            hours: [
                { on: friday, at: 9 },
            ],
            reserver: "dummy"
        }
        await reservations.add(theSameReservation);

        expect(() => reservations.add(theSameReservation)).rejects
            .toThrowError("Overlapping reservations");

    });




})