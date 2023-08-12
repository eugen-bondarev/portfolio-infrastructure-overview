import clsx from 'clsx'
import './globals.css'
import './main.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eugen Bondarev - Infrastructure Overview',
  description: 'A high-level overview of my infrastructure',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'h-[1000px] overflow-hidden')}>
        {children}
      </body>
    </html>
  )
}
