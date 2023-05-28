'use client'

import { useForm } from "react-hook-form"
import { HourPicker } from "./HourPicker";
import { BusinessHours, CloseOfBusiessHour, DropoffHoursNextDay, DropoffTimesOnPickupDate } from "@/domain/types";
import { useContext, useEffect } from "react";
import { DateContext } from "./DateContext";

type FormSubmitEvent = {
    firstName: string,
    lastName: string,
    from: number,
    to: number,
}

export const ReservationForm = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstName: 'Mohsen',
            lastName: 'Bazmi',
            from: 9,
            to: 11
        }
    });
    const { selectedDate } = useContext(DateContext);
    useEffect(() => {
        alert(selectedDate.numberOfHours)
    }, [selectedDate])

    console.log(errors); //=> on change


    const onSubmit = (e: FormSubmitEvent) => {
        console.log(e);
    }

    const pickupHourOptions = BusinessHours.map(h => <option key={h} value={h}>{h}</option>);
    const dropoffHourOptions = <>
        {DropoffTimesOnPickupDate.map(h => <option key={h} value={h}>{h}</option>)}
        <optgroup label="the next day">
            {
                DropoffHoursNextDay.map(h =>
                    <option key={h} value={CloseOfBusiessHour + h} >
                        `${h} (The Next Day)`
                    </option>)
            }
        </optgroup>
    </>

    return <form onSubmit={handleSubmit(onSubmit)} >
        <fieldset disabled={selectedDate.numberOfHours == 8}>
            <div className="flex flex-col p-10">

                <div className="flex justify-between flex-col space-y-8">
                    <div className="flex flex-row justify-around flex-wrap">
                        <div className="flex-col flex space-y-2">
                            <label>From</label>
                            <select {...register("from")} className="text-gray-800 tracking-wide indent-2 rounded-sm w-56 h-6">
                                {pickupHourOptions}
                            </select>
                        </div>
                        <div className="flex-col flex space-y-2">
                            <label>To</label>
                            <select {...register("to")} className="text-gray-800 tracking-wide indent-2 rounded-sm w-56 h-6">
                                {dropoffHourOptions}
                            </select>
                        </div>
                    </div>
                    {/* <HourPicker label="From" options={pickupHourOptions} />
                    <HourPicker label="To" options={pickupHourOptions} /> */}
                    <div className="flex flex-row justify-around flex-wrap">
                        <div className="flex-col flex space-y-2">
                            <label>First Name</label>
                            <input className="text-gray-800 tracking-wide indent-2 rounded-sm w-56 h-6"
                                {...register("firstName", {
                                    required: "First Name is required!",
                                    minLength: {
                                        value: 4,
                                        message: "Too short!"
                                    }
                                })} placeholder="First Name"
                                maxLength={8} />
                            <span> {errors.firstName?.message}</span>

                        </div>
                        <div className="flex flex-row justify-around flex-wrap">
                            <div className="flex-col flex space-y-2">
                                <label>Last Name</label>
                                <input className="text-blue-900 tracking-wide indent-2 rounded-sm w-56 h-6"
                                    {...register("lastName", {
                                        required: "Last Name is required!",
                                        minLength: {
                                            value: 4,
                                            message: "Too short!"
                                        }
                                    })} placeholder="Last Name"
                                    maxLength={8} />
                                <span> {errors.lastName?.message}</span>

                            </div>
                        </div>
                    </div>
                    <input className="self-center w-64 ignore-csspx-6 py-2 text-sm transition-colors duration-300 rounded shadow-md text-emerald-100 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-300" type="submit" value="Reserve" />
                </div>
            </div>
        </fieldset>
    </form>
}