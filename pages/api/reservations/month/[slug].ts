import { APIError } from "@/api-client/api-error";
import { getReservationRepository } from "@/lib/dependencies";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        let { slug } = req.query as any;
        let date: Date;
        try {
            date = dateSchema.parse(new Date(slug as any));
        } catch (e) {
            res.status(400).json(new APIError("Invalid date format: " + slug));
            return;
        }

        try {
            const reservations = getReservationRepository();

            const result = await reservations.forTheSameMonthAs(date);
            res.status(200).json(result);

        }
        catch (e) {
            console.log({ error: e });//TODO: Collect it in log aggregators
            res.status(500).json(new APIError("An error occured on the server."));
        }
    }
}

export const dateSchema = z.date()