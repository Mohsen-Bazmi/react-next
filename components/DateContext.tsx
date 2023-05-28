'use client'
import { ReservedHoursPerDay } from "@/domain/types";
import { Dispatch, PropsWithChildren, createContext, useState } from "react";

type StartDateChangedAction = ReservedHoursPerDay

type DispatchStartDate = Dispatch<StartDateChangedAction>
type StartDateContextState = {
    selectedDate: StartDateChangedAction,
    selectDate: DispatchStartDate
}
const initialState: StartDateChangedAction = {
    date: new Date(),
    numberOfHours: 0
}


export const DateContext = createContext({ selectedDate: initialState } as StartDateContextState);

export const DateContextProvider = ({ children }: PropsWithChildren) => {
    const [selectedDate, selectDate] = useState<StartDateChangedAction>(initialState);

    return <DateContext.Provider value={{ selectedDate, selectDate }}>
        {children}
    </DateContext.Provider>
}