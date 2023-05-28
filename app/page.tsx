import { DateContextProvider } from "@/components/DateContext";
import { ReservationCalendar } from "@/components/ReservationCalendar";
import { ReservationForm } from "@/components/ReservationForm";
import { ReservationsOfTheDay } from "@/components/ReservationsOfTheDay";


const Home = () =>
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">

      <DateContextProvider>
        <div className="flex flex-col md:flex-row flex-wrap justify-around">
          <ReservationCalendar />
          <ReservationsOfTheDay />
        </div>
        <ReservationForm />
      </DateContextProvider>

    </div>
  </main>

export default Home;