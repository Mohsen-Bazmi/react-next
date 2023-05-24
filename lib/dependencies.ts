import { PrismaReservationRepository } from "@/data-access/prisma-reservation-repository"
import { ReservationRepository } from "@/domain/repository"

const services = {
    reservationRpository: PrismaReservationRepository
}

export const setReservationRepository = (repository: ReservationRepository) =>
    services.reservationRpository = repository;

export const getReservationRepository = () =>
    services.reservationRpository;