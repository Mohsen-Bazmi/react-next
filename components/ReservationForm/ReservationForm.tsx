'use client'

import { useForm } from "react-hook-form"
import { BusinessHour, BusinessHours, CloseOfBusinessHour,  OpenOfBusinessHour, ReservationEnd, ReservationStart } from "@/domain/types";
import { useContext } from "react";
import { DateContext } from "../DateContext";
import { useMutation } from "react-query";
import { postReservation } from "@/api-client/reservation-api";
import { Toaster, toast } from "react-hot-toast";
import { Reserve } from "@/domain/reserve-command";
import { InputFrame } from "./InputFrame";
import { nextBusinessDayAfter } from "@/lib/date";
import { DropoffHourOptions } from "./DropoffHourOptions";
import { PickupHourOptions } from "./PickupHourOptions";

//TODO: Refactor it
export const ReservationForm = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstName: 'Mohsen',
            lastName: 'Bazmi',
            fromHour: 9 as BusinessHour,
            toHour: 11 as BusinessHour
        }
    });
    const { selectedDate } = useContext(DateContext);

    let { mutate } = useMutation({
        mutationFn: postReservation,
        onError: (r: { error: { message: string } }) => {
            toast.error(r.error.message);
        },
        onSuccess: () => {
            toast.success('Reservation succeeded.');
        }
    });

    const onSubmit = ({ firstName, lastName, fromHour, toHour }: FormSubmitEvent) => {

        const dropsOffTheNextDay = toHour.toString().includes('nextBusinessDay @');

        let reservationEnd: ReservationEnd;

        if (dropsOffTheNextDay) {
            reservationEnd = {
                date: nextBusinessDayAfter(selectedDate.date),
                at: parseInt(toHour.toString().split('@')[1]) as OpenOfBusinessHour
            };
        } else {
            reservationEnd = {
                date: selectedDate.date,
                at: parseInt(toHour.toString()) as BusinessHour | CloseOfBusinessHour
            }
        }
        const reservationStart: ReservationStart = {
            date: selectedDate.date,
            at: parseInt(fromHour.toString()) as OpenOfBusinessHour
        }
        const dto: Reserve = {
            from: reservationStart,
            to: reservationEnd,
            reserver: { firstName, lastName },
            type: 'reserve'
        };
        mutate(dto);
    }



    return <form onSubmit={handleSubmit(onSubmit)} >
        <fieldset disabled={selectedDate.numberOfHours == BusinessHours.length}>
            <div className="flex flex-col p-10">

                <div className="flex justify-between flex-col space-y-8">
                    <div className="flex flex-row justify-around flex-wrap">
                        <InputFrame label="From">
                            <select {...register("fromHour")}>
                                <PickupHourOptions selectedDate={selectedDate} />
                            </select>
                        </InputFrame>
                        <InputFrame label="To">
                            <select {...register("toHour")}>
                                <DropoffHourOptions selectedDate={selectedDate} />
                            </select>
                        </InputFrame>
                    </div>
                    {/* <HourPicker label="From" options={pickupHourOptions} />
                    <HourPicker label="To" options={pickupHourOptions} /> */}
                    <div className="flex flex-row justify-around flex-wrap">
                        <InputFrame label="First Name">
                            <input
                                {...register("firstName", {
                                    required: "First Name is required!",
                                    minLength: {
                                        value: 4,
                                        message: "Too short!"
                                    }
                                })} placeholder="First Name"
                                maxLength={8} />
                            <span> {errors.firstName?.message}</span>

                        </InputFrame>
                        <InputFrame label="Last Name">
                            <input
                                {...register("lastName", {
                                    required: "Last Name is required!",
                                    minLength: {
                                        value: 4,
                                        message: "Too short!"
                                    }
                                })} placeholder="Last Name"
                                maxLength={8} />
                            <span> {errors.lastName?.message}</span>

                        </InputFrame>
                    </div>
                    <input type="submit" value="Reserve" className="self-center w-64 ignore-csspx-6 py-2 text-sm transition-colors duration-300 rounded shadow-md text-emerald-100 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-300" />
                    <Toaster
                        position="bottom-center"
                        reverseOrder={true}
                    />
                </div>
            </div>
        </fieldset>

    </form>
}

type FormSubmitEvent = {
    firstName: string,
    lastName: string,
    fromHour: number,
    toHour: number,
}