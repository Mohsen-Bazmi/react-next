import { InMemoryReservationRepository } from "@/data-access/in-memory-reservations-repository";
import { PrismaReservationRepository } from "@/data-access/prisma-reservation-repository"
import { ReservationRepository } from "@/domain/reservation-repository";
import { ReservationService } from "@/usecases/reservation-service";

let reservationRpository = PrismaReservationRepository;
if (process.argv.includes("--with-in-memory-db")) {
    reservationRpository = InMemoryReservationRepository;
}
export const setReservationRepository = (repository: ReservationRepository) =>
    reservationRpository = repository;

export const getReservationRepository = () =>
    reservationRpository;




let arbitraryDateTime: Date | undefined;
export const setCurrentTime = (date: Date) =>
    arbitraryDateTime = date;

export const getCurrentTime = () =>
    arbitraryDateTime ?? new Date();




let reservationService = ReservationService;
export const getReservationService = () =>
    reservationService;
export const setReservationService = (service: ReservationService) =>
    reservationService = service;