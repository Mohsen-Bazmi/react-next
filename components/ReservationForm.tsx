'use client'

import { useForm } from "react-hook-form"

export const ReservationForm = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstName: 'Mohsen',
            lastName: 'Bazmi'
        }
    });

    console.log(errors); //=> on change


    const onSubmit = (data: any) => {
        console.log(data);
    }
    return <form onSubmit={handleSubmit(onSubmit)} >

        <div className="flex flex-col">
            
            <div className="flex">

                <input {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                        value: 4,
                        message: "First Name must be no shorter than 4 characters."
                    }
                })} placeholder="First Name" />
                {errors.firstName?.message}
                <input {...register("lastName", {
                    required: "Last Name is required",
                    // maxLength:{

                    // },
                    minLength: {
                        value: 4,
                        message: "Last Name must be no shorter than 4 characters."
                    }
                })} placeholder="Last Name" />
                <input type="submit" />

            </div>
        </div>
    </form>
}