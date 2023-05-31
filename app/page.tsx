'use client'

import { queryClient } from "@/api-client/query-client";
import { ReservationCalendar } from "@/components/Calendar/ReservationCalendar";
import { DateContextProvider } from "@/components/DateContext";
import { ReservationForm } from "@/components/ReservationForm/ReservationForm";
import { ReservationsOfTheDay } from "@/components/ReservationsOfTheDay/ReservationsOfTheDay";
import { QueryClientProvider } from "react-query";


const Home = () =>
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
      <DateContextProvider>
        <QueryClientProvider client={queryClient}>
          <div className="flex flex-col md:flex-row flex-wrap justify-between">
            <ReservationCalendar />
            <ReservationsOfTheDay />
          </div>
          <ReservationForm />
        </QueryClientProvider>
      </DateContextProvider>
    </div>
  </main>

export default Home;