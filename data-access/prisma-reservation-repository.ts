import { Hour, NumberOfHours } from '@/domain/types';
import { ReservationRepository } from '@/domain/repository'
import { db } from '@/lib/db';

export const PrismaReservationRepository: ReservationRepository = {
    add: async ({ id, reserver, hours }) => {

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

    },

    days: async () => {

        const dates = await db.reservedHours.groupBy({
            by: ['date'],
            _count: true,
        });

        return dates.map(day => ({
            date: day.date,
            numberOfHours: day._count as NumberOfHours
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
