import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HallmarksExplorer — The 12 Hallmarks of Aging',
  description:
    'Explore the 2023 hallmarks of aging framework with cited research examples, study populations, measurement limits, and open questions.',
  openGraph: {
    title: 'HallmarksExplorer — The 12 Hallmarks of Aging',
    description:
      'Explore aging biology with claim-level citations and clearly bounded research evidence.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F8F7]">{children}</body>
    </html>
  )
}
