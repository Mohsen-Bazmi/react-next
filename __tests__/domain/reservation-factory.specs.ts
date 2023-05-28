import { A } from "@/__test_until__/cloner";
import { friday, lastMonthOnMonday, reserveCommand, saturday, theDayAfterTomorrow, today, todayAt9am, tomorrow } from "@/__test_until__/prototypes";
import { BusinessRuleError } from "@/domain/errors";
import { createReservation } from "@/domain/reservation-factory";
import { Reserve } from "@/domain/reserve-command";
import { Reservation } from "@/domain/types"
import { theMondayAfter } from "@/lib/date";
import { setCurrentTime } from "@/lib/dependencies";

describe('reservation factory', () => {

    it('creates reservations for today', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 9 },
                to: { date: today, at: 12 }
            });

        const reservation = createReservation(command);

        expect(reservation).toEqual(<Reservation>{
            hours: [
                { date: today, at: 9 },
                { date: today, at: 10 },
                { date: today, at: 11 }
            ],
            reserver: command.reserver,
            interval: { from: command.from, to: command.to },
        });
    });




    it('allows dropping off the next work day before 11 am', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 16 },
                to: { date: tomorrow, at: 11 }
            });

        const reservation = createReservation(command);

        expect(reservation).toEqual(
            expect.objectContaining(<Reservation>{
                hours: [
                    { date: today, at: 16 },

                    { date: tomorrow, at: 9 },
                    { date: tomorrow, at: 10 },
                ],
            }));
    });




    it('rejects reservations for longer than two days', () => {

        const command = A(reserveCommand, {
            from: { date: today, at: 9 },
            to: { date: theDayAfterTomorrow, at: 12 }
        });

        const resut = createReservation(command);

        expect(resut).toBeInstanceOf(BusinessRuleError);
    });




    it('rejects reservations for longer than the next day at 11 a.m.', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 9 },
                to: { date: tomorrow, at: 12 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(BusinessRuleError);

    });



    it('rejects pick-ups for before 9 am', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 8 as any },
                to: { date: today, at: 9 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(BusinessRuleError);

    });




    it('rejects drop-offs for after 5 pm', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 9 },
                to: { date: today, at: 18 as any }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(BusinessRuleError);

    });



    it('requires drop off to be after the pick up for reservations on the same day', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 11 },
                to: { date: today, at: 9 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(BusinessRuleError);

    });



    it('requires drop off to be after the pick up for reservations on different days', () => {
        const command = A(reserveCommand,
            {
                from: { date: tomorrow, at: 9 },
                to: { date: today, at: 11 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(BusinessRuleError);

    });



    it('rejects reservations with the same pick up and drop off times', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 11 },
                to: { date: today, at: 11 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(BusinessRuleError);

    });



    it('rejects reservations with past pick-up times', () => {

        setCurrentTime(tomorrow);

        const result = createReservation(A(reserveCommand,
            {
                from: { date: today, at: 11 },
                to: { date: today, at: 12 }
            }));

        expect(result).toBeInstanceOf(BusinessRuleError);

    });

    //Defect Driven Tests:
    it(`manages the conflict between today's hours and tomorrow's`, () => {
        const command = A(reserveCommand, {
            from: { date: today, at: 9 },
            to: { date: tomorrow, at: 11 },
        });

        const reservation = createReservation(command);


        expect(reservation).toEqual(
            expect.objectContaining(<Reservation>{
                hours: [
                    { date: today, at: 9 },
                    { date: today, at: 10 },
                    { date: today, at: 11 },
                    { date: today, at: 12 },
                    { date: today, at: 13 },
                    { date: today, at: 14 },
                    { date: today, at: 15 },
                    { date: today, at: 16 },

                    { date: tomorrow, at: 9 },
                    { date: tomorrow, at: 10 },
                ],
            }));
    });





    it.each([
        A(reserveCommand, {
            from: { date: friday, at: 9 },
            to: { date: saturday, at: 11 },
        })
    ])(`rejects weekend drop-offs`, (command: Reserve) =>
        expect(createReservation(command)).
            toBeInstanceOf(BusinessRuleError));





    it.each([
        A(reserveCommand, {
            from: { date: saturday, at: 9 },
            to: { date: saturday, at: 11 },
        }),
        A(reserveCommand, {
            from: { date: saturday, at: 9 },
            to: { date: theMondayAfter(saturday), at: 11 },
        })
    ])(`rejects weekend pick-ups`, (command: Reserve) =>
        expect(createReservation(command)).
            toBeInstanceOf(BusinessRuleError));


    //Characerization Tests:
    it(`rejects reservations with the same pick-up and drop-off times`, () => {

        const result = createReservation(A(reserveCommand,
            {
                from: todayAt9am,
                to: todayAt9am
            }));

        expect(result).toBeInstanceOf(BusinessRuleError);
    })

    beforeEach(() => setCurrentTime(lastMonthOnMonday));

})