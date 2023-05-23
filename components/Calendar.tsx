'use client'
import React, { useId, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17] as const;
type Hour = typeof workHours[number];
type HourProps = { hour: Hour, isFree: Boolean };
const Hour = ({ hour, isFree }: HourProps) => {
    let classes = "border-white disabled hover:border-2 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg";
    if (!isFree) {
        classes += " focus:outline-none disabled:opacity-25 text-gray-800 border-gray-800";
    }


    return <button className={classes}>{hour}</button>;
}

const HourPicker = () => {
    return <>
        <label>At</label>
        <div className='flex flex-row font-mono text-white text-sm font-bold leading-6'>
            {workHours.map(hour => <Hour key={hour} hour={hour} isFree={false} />)}
        </div>
    </>
}

export function DatePicker({ label }: { label: string }) {
    const [selectedDate, selectDate] = useState(new Date());
    const id = useId();

    return <div className="flex flex-col">
        <label htmlFor={id}>{label}</label>
        <div id={id} className="text-gray-800">
            <Calendar
                tileClassName='active:bg-green-800'
                onChange={(e: any) => selectDate(e)}
                value={selectedDate} />
        </div>

        <HourPicker />
    </div>;
}