import { A } from "@/__test_until__/cloner";
import { friday, lastMonthOnMonday, monday, reserveCommand, saturday, theDayAfterTomorrow, today, tomorrow } from "@/__test_until__/prototypes";
import { BusinessRuleError } from "@/domain/errors";
import { createReservation } from "@/domain/reservation-factory";
import { Reserve } from "@/domain/reserve-command";
import { NewReservation } from "@/domain/types"
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

        expect(reservation).toEqual(<NewReservation>{
            reserver: command.reserverName,
            startDate: today,
            hours: [
                { on: today, at: 9 },
                { on: today, at: 10 },
                { on: today, at: 11 }
            ]
        });
    });




    it('allows dropping off the next work day before 11 am', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 16 },
                to: { date: tomorrow, at: 11 }
            });

        const reservation = createReservation(command);

        expect(reservation).toEqual(<NewReservation>{
            reserver: command.reserverName,
            startDate: today,
            hours: [
                { on: today, at: 16 },

                { on: tomorrow, at: 9 },
                { on: tomorrow, at: 10 },
            ],
        });
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



    it('rejects reservations that start before 9 am', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 8 as any },
                to: { date: today, at: 9 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(BusinessRuleError);

    });




    it('rejects reservations that end after 5 pm', () => {
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
        setCurrentTime(today);
        const command = A(reserveCommand,
            {
                from: { date: today, at: 11 },
                to: { date: today, at: 11 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(BusinessRuleError);

    });

    //Defect Driven Tests:
    it(`manages the conflict between today's hours and tomorrow's`, () => {
        const command = A(reserveCommand, {
            from: { date: today, at: 9 },
            to: { date: tomorrow, at: 11 },
        });

        const reservation = createReservation(command);


        expect(reservation).toEqual(<NewReservation>{
            reserver: command.reserverName,
            startDate: today,
            hours: [
                { on: today, at: 9 },
                { on: today, at: 10 },
                { on: today, at: 11 },
                { on: today, at: 12 },
                { on: today, at: 13 },
                { on: today, at: 14 },
                { on: today, at: 15 },
                { on: today, at: 16 },

                { on: tomorrow, at: 9 },
                { on: tomorrow, at: 10 },
            ],
        });
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



            
    beforeEach(() => setCurrentTime(lastMonthOnMonday));

})