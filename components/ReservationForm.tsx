'use client'

import { useForm } from "react-hook-form"
import { HourPicker } from "./HourPicker";
import { BusinessHours, CloseOfBusiessHour } from "@/domain/types";

export const ReservationForm = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstName: 'Mohsen',
            lastName: 'Bazmi'
        }
    });

    // console.log(errors); //=> on change


    const onSubmit = (data: any) => {
        console.log(data);
    }
    return <form onSubmit={handleSubmit(onSubmit)} >

        <div className="flex flex-col p-10">

            <div className="flex justify-between flex-col space-y-8">
                <HourPicker label="From" options={BusinessHours} />
                <HourPicker label="To" options={[...BusinessHours, CloseOfBusiessHour, 9, 10, 11]} />
                <label>Name</label>
                <div className="flex flex-row justify-around flex-wrap">
                    <div className="flex-col flex space-y-2">
                        <label>First</label>
                        <input className="text-gray-800 tracking-wide indent-2 rounded-sm w-56" {...register("firstName", {
                            required: "First Name is required",
                            minLength: {
                                value: 4,
                                message: "First Name must be no shorter than 4 characters."
                            }
                        })} placeholder="First Name" />
                        <span> {errors.firstName?.message}</span>
                    </div>
                    <div className="flex flex-row justify-around flex-wrap">
                        <div className="flex-col flex space-y-2">
                            <label>Last</label>
                            <input className="text-blue-900 tracking-wide indent-2 rounded-sm w-56" {...register("lastName", {
                                required: "Last Name is required",
                                // maxLength:{

                                // },
                                minLength: {
                                    value: 4,
                                    message: "Last Name must be no shorter than 4 characters."
                                }
                            })} placeholder="Last Name" />
                        <span> {errors.lastName?.message}</span>

                        </div>
                    </div>
                </div>
                <input className="self-center w-64 ignore-csspx-6 py-2 text-sm transition-colors duration-300 rounded shadow-md text-emerald-100 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-300" type="submit" value="Reserve" />
            </div>
        </div>
    </form>
}