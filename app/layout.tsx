import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SCRP',
  description: 'Created by Arn',
  generator: 'Arn',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
