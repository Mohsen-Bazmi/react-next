
import { A } from "@/__test_until__/cloner";
import { friday, John, monday, newReservation, today } from "@/__test_until__/prototypes";
import { InMemoryReservationRepository } from "@/data-access/in-memory-reservations-repository";
import { PrismaReservationRepository } from "@/data-access/prisma-reservation-repository";
import { ReservationConfilictError } from "@/domain/errors";
import { ReservationRepository } from "@/domain/reservation-repository";
import { ReservedHour } from "@/domain/types";
import { firstDayOfMonth, firstDayOfNextMonth, lastDayOfLastMonth } from "@/lib/date";


describe.each([
    PrismaReservationRepository,// cleans the data => use the containerized sand box
    InMemoryReservationRepository
])('Reservation repository', (reservations: ReservationRepository) => {

    afterEach(reservations.clear);


    it('stores reservations', async () => {

        await reservations.add(A(newReservation, {
            hours: [
                { on: friday, at: 9 }
            ],
            reserver: John,
            startDate: friday
        }));

        expect(await reservations.on(friday))
            .toContainEqual({
                on: friday,
                at: 9,
                reserver: John
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
        }));

        const days = await reservations.forTheSameMonthAs(friday);

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
            toThrow(ReservationConfilictError);

    });

    it(`rejects reservations that overlap existing ones`, async () => {

        const theSameReservation = A(newReservation)
        await reservations.add(theSameReservation);

        await expect(() => reservations.add(theSameReservation)).rejects
            .toThrow(ReservationConfilictError);

    });

    it(`filters reservations by month`, async () => {
        const lastMonth = lastDayOfLastMonth(today);
        const nextMonth = firstDayOfNextMonth(today);

        await reservations.add(A(newReservation, {
            hours: [
                { on: today, at: 9 },
                { on: lastMonth, at: 10 },
                { on: nextMonth, at: 11 },
            ],
        }));

        const days = await reservations.forTheSameMonthAs(friday);

        expect(days).not.toContainEqual(
            expect.objectContaining({
                date: lastMonth
            }));
            
        expect(days).not.toContainEqual(
            expect.objectContaining({
                date: nextMonth
            }));
    })

})