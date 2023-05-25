import { A } from "@/__test_until__/cloner";
import { pastYear, reserveCommand, theDayAfterTomorrow, today, tomorrow } from "@/__test_until__/prototypes";
import { createReservation } from "@/domain/reservation-factory";
import { NewReservation } from "@/domain/types"
import { setCurrentTime } from "@/lib/dependencies";
import { log } from "console";


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

        expect(resut).toBeInstanceOf(Error);
    });




    it('rejects reservations for longer than the next day at 11 a.m.', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 9 },
                to: { date: tomorrow, at: 12 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(Error);

    });



    it('rejects reservations that start before 9 am', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 8 as any },
                to: { date: today, at: 9 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(Error);

    });




    it('rejects reservations that end after 5 pm', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 9 },
                to: { date: today, at: 18 as any }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(Error);

    });



    it('requires drop off to be after the pick up for reservations on the same day', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 11 },
                to: { date: today, at: 9 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(Error);

    });



    it('requires drop off to be after the pick up for reservations on different days', () => {
        const command = A(reserveCommand,
            {
                from: { date: tomorrow, at: 9 },
                to: { date: today, at: 11 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(Error);

    });



    it('rejects reservations with the same pick up and drop off times', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 11 },
                to: { date: today, at: 11 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(Error);

    });



    it('rejects reservations with past pick-up times', () => {
        setCurrentTime(today);
        const command = A(reserveCommand,
            {
                from: { date: today, at: 11 },
                to: { date: today, at: 11 }
            });

        const result = createReservation(command);

        expect(result).toBeInstanceOf(Error);

    });
    
    //Defect Driven Tests:
    it(`doesn't allow taday's hours to overlap tomorrow's`, () => {
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


    beforeEach(() => setCurrentTime(pastYear));

})