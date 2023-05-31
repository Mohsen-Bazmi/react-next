import { APIError } from "@/api-client/api-error";
import { validateReservationDto } from "@/data-transfer-objects/reservation-validator";
import { BusinessRuleError } from "@/domain/errors";
import { ReservationConfilictError } from "@/domain/errors";
import { getReservationService } from "@/lib/dependencies";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        try {

            const { dto, validationResult } = validateReservationDto(req.body)
            if (!validationResult.success) {

                res.status(400).json(new APIError(validationResult.error.message));
                return;
            }
            await getReservationService().execute(dto);

            res.status(201)
                .setHeader('Content-Type', 'application/json')
                // .setHeader('location', '')// No routes to the resource
                .json(dto);

        } catch (e) {

            if (e instanceof ReservationConfilictError) {

                res.status(409).json(new APIError(e.message));

            }
            else if (e instanceof BusinessRuleError) {

                console.log({ e })
                res.status(400).json(new APIError(e.message));

            }
            else {

                console.log({ error: e });//TODO: Collect it in log aggregators
                res.status(500).json(new APIError("An error occured on the server."));

            }

        }
    }
}