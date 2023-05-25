import { PrismaReservationRepository } from "@/data-access/prisma-reservation-repository"
import { ReservationRepository } from "@/domain/reservation-repository";


let reservationRpository = PrismaReservationRepository;
export const setReservationRepository = (repository: ReservationRepository) =>
    reservationRpository = repository;

export const getReservationRepository = () =>
    reservationRpository;




let arbitraryDateTime: Date | undefined;
export const setCurrentTime = (date: Date) =>
    arbitraryDateTime = date;

export const getCurrentTime = () =>
    arbitraryDateTime ?? new Date();