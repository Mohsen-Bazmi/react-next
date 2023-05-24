import { Hour, NumberOfHoursPerDay } from '@/domain/types';
import { ReservationRepository } from '@/domain/repository'
import { db } from '@/lib/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const PrismaReservationRepository: ReservationRepository = {
    add: async ({ id, reserver, hours }) => {
        try {
            await db.reservations.create({
                data: {
                    id, reserver,
                    hours: {
                        createMany: {
                            data: hours.map(h => ({
                                id: `${h.on.toDateString()}_${h.at}`, //Concurrency lock
                                date: h.on,
                                hour: h.at,
                                reservationId: id,
                                reserver
                            }))
                        }
                    }
                }
            });
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
                throw new Error("Overlapping reservations");
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
                reserver: true
            }
        })
        return result.map(h => ({
            on: day,
            at: h.hour as Hour,
            reserver: h.reserver,
        }))
    },

    clear: async () => {
        await db.$transaction([
            db.reservedHours.deleteMany({}),
            db.reservations.deleteMany({})
        ])
    }
}
