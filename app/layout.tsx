import Nav from '@/components/Nav'
import './globals.css'
import { PropsWithChildren } from 'react'

export const metadata = {
  title: 'Car Rental',
  description: 'Car reservation app',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body >
        <Nav />
        {children}
      </body>
    </html>
  )
}
