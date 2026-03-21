import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BioLink — Your link. Your identity.',
  description: 'One link. Everything about you. Fully customizable biolink profiles, invite only.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
