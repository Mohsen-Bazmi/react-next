import { BusinessHour, NumberOfHoursPerDay, Reservation, ReservedHour } from '@/domain/types';
import { ReservationRepository } from '@/domain/reservation-repository';
import { db } from '@/lib/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ReservationConfilictError } from '@/domain/errors';
import { firstDayOfMonth, lastDayOfMonth } from '@/lib/date';

export const PrismaReservationRepository: ReservationRepository = {
    add: async ({ reserver, hours, interval }) => {

        try {
            const reservationId = interval.from.date.toDateString() + reserver.firstName + reserver.lastName
            await db.reservations.create({
                data: {
                    id: reservationId, //Concurrency lock
                    firstName: reserver.firstName,
                    lastName: reserver.lastName,
                    startDate: interval.from.date,
                    startHour: interval.from.at,
                    endDate: interval.to.date,
                    endHour: interval.to.at,
                    hours: {
                        createMany: {
                            data: hours.map(h => ({
                                id: `${h.date.toDateString()}_${h.at}`, //Concurrency lock
                                date: h.date,
                                hour: h.at,
                                // reservationId,
                                firstName: reserver.firstName,
                                lastName: reserver.lastName,
                            }))
                        }
                    }
                }
            });
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
                throw new ReservationConfilictError("Overlapping reservations. Two people cannot reserve the car, and a person can reserve the car no more than once a day.");
            throw e;
        }
    },

    forTheSameMonthAs: async (date) => {
        const startOfMonth = firstDayOfMonth(date);
        const endOfMonth = lastDayOfMonth(date);
        const dates = await db.reservedHours.groupBy({
            by: ['date'],
            where: {
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth
                }
            },
            _count: true,
        });

        return dates.map(day => ({
            date: day.date,
            numberOfHours: day._count as NumberOfHoursPerDay
        }));

    },

    on: async (day) => {
        const result = await db.reservations.findMany({
            where: { startDate: day }, include: { hours: true }
        });
        return result.map(({ startDate, startHour, endDate, endHour, firstName, lastName, hours }) => ({
            interval: {
                from: { date: startDate, at: startHour as BusinessHour },
                to: { date: endDate, at: endHour as BusinessHour }
            },
            reserver: { firstName, lastName },
            hours: hours.map(h => ({ date: h.date, at: h.hour as BusinessHour }))
        }));
    },

    clear: async () => {
        await db.$transaction([
            db.reservedHours.deleteMany({}),
            db.reservations.deleteMany({})
        ])
    }
}
