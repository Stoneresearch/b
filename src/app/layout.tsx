import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bahar Şener',
  description: 'Visual Artist & Tattoo Artist based in Istanbul',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
