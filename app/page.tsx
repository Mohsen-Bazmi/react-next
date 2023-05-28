import { ReservationForm } from "@/components/ReservationForm";
import { ReservationReport } from "@/components/ReservationReport";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        {/* calendar for the current month: 
              The number of that dayʼs reservation when we hover
              over it. Also for each day, it should show a different shade of green 
                        (higher when there are more reservations) */}

        <ReservationReport />
        <ReservationForm />
        {/* current date reservations: 
              Once the user clicks on the date he can see what users are and for how long
                      they are using the car that day. (if any)
                      i. format
                      1. {name} - {from} → {to}
                      ii. example
                      1. User 1 - 10  AM → 11 AM
                      2. User 2 - 12 PM → 2 PM
                      3. User 3 - 4 PM → Monday At 11 AM */}

        {/* reservation form (disabled by default) : 
            Once the user clicks on the date the form should be enabled 
            (Unless there are no more spots left, in that case, the form s
            hould be disabled)
            
            model: {from: (date=> hour), to: (date=> hour), available time **slots** as dropdown }
            rules: a user cannot have multiple reservations per day 
            errors: show a clear error or indicator of why the user canʼt do an action */}

        {/* Login, logout */}
      </div>
    </main>
  )
}
