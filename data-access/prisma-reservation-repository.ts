import { BusinessHour, NumberOfHoursPerDay } from '@/domain/types';
import { ReservationRepository } from '@/domain/reservation-repository';
import { db } from '@/lib/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ReservationConfilictError } from '@/domain/errors';

export const PrismaReservationRepository: ReservationRepository = {
    add: async ({ reserver, hours, startDate }) => {
        try {
            const reservationId = startDate.toDateString() + reserver.firstName + reserver.lastName
            await db.reservations.create({
                data: {
                    id: reservationId, //Concurrency lock
                    startDate,
                    firstName: reserver.firstName,
                    lastName: reserver.lastName,
                    hours: {
                        createMany: {
                            data: hours.map(h => ({
                                id: `${h.on.toDateString()}_${h.at}`, //Concurrency lock
                                date: h.on,
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

    days: async () => {

        const dates = await db.reservedHours.groupBy({
            by: ['date'],
            _count: true,
        });

        return dates.map(day => ({
            date: day.date,
            numberOfHours: day._count as NumberOfHoursPerDay
        }));

    },

    of: async (day) => {
        const result = await db.reservedHours.findMany({
            select: {
                hour: true,
                firstName: true,
                lastName: true
            }
        })
        return result.map(h => ({
            on: day,
            at: h.hour as BusinessHour,
            reserver: {
                firstName: h.firstName,
                lastName: h.lastName
            }
        }))
    },

    clear: async () => {
        await db.$transaction([
            db.reservedHours.deleteMany({}),
            db.reservations.deleteMany({})
        ])
    }
}
