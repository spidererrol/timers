import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const devflag = process.env.APP_RUNMODE == "dev" ? " (dev)" : ""

export const metadata: Metadata = {
  title: "Void Timers" + devflag,
  description: "Multiple Timers",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
