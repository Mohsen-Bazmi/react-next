
import { A } from "@/__test_until__/cloner";
import { friday, John, monday, newReservation, today, todayAt5Pm, todayAt9am, todayFrom9To5pm } from "@/__test_until__/prototypes";
import { InMemoryReservationRepository } from "@/data-access/in-memory-reservations-repository";
import { PrismaReservationRepository } from "@/data-access/prisma-reservation-repository";
import { ReservationConfilictError } from "@/domain/errors";
import { ReservationRepository } from "@/domain/reservation-repository";
import { ReservedHour, Reservation } from "@/domain/types";
import { firstDayOfNextMonth, lastDayOfLastMonth } from "@/lib/date";


describe.each([
    // PrismaReservationRepository,// cleans the data => use the containerized sand box
    InMemoryReservationRepository
])('Reservation repository', (reservations: ReservationRepository) => {

    afterEach(reservations.clear);


    it('stores reservations', async () => {

        const originalReservation = A(newReservation);

        await reservations.add(originalReservation);

        const fetchedReservation = await reservations.on(originalReservation.interval.from.date)

        expect(fetchedReservation).toContainEqual(originalReservation);
    });

    it('counts reservations of each day', async () => {

        await reservations.add(A(newReservation, {
            hours: [
                { date: friday, at: 9 },
                { date: friday, at: 10 },
                { date: friday, at: 11 },
                { date: monday, at: 9 },
                { date: monday, at: 10 },
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

        const duplicateHours: ReservedHour = { date: friday, at: 9 }
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
                { date: today, at: 9 },
                { date: lastMonth, at: 10 },
                { date: nextMonth, at: 11 },
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