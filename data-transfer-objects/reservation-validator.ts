import { Reserve } from "@/domain/reserve-command";
import { createReservationId } from "@/domain/rules";
import { z } from "zod";

export const validateReservationDto = (input: Reserve) => {

    const dto: Reserve = {
        from: {
            date: new Date(input.from.date),
            at: input.from.at
        },
        to: {
            date: new Date(input.to.date),
            at: input.to.at
        },
        reserver: {
            firstName: input.reserver.firstName,
            lastName: input.reserver.lastName
        },
        type: 'reserve'
    };
    const validationResult = reserveSchema.safeParse(dto)

    dto.reservationId = createReservationId(dto);

    return { dto, validationResult }
}



const businessHourSchema = z.union([
    z.literal(9),
    z.literal(10),
    z.literal(11),
    z.literal(12),
    z.literal(13),
    z.literal(14),
    z.literal(15),
    z.literal(16)
])

const reservedHourSchema = z.object({
    date: z.date(),
    at: businessHourSchema
})

const reserverSchema = z.object({
    firstName: z.string(),
    lastName: z.string()
})

const closeOfBusinessHourSchema = z.literal(17)

const reservationStartSchema = reservedHourSchema

const reservationEndSchema = reservationStartSchema
    .omit({ at: true })
    .and(
        z.object({
            at: z.union([businessHourSchema, closeOfBusinessHourSchema])
        })
    )

const reservationIntervalSchema = z.object({
    from: reservationStartSchema,
    to: reservationEndSchema
})

const reserveSchema = z
    .object({
        type: z.literal("reserve"),
        reservationId: z.string().optional(),
        reserver: reserverSchema
    })
    .and(reservationIntervalSchema)
