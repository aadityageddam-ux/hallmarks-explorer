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
    'Interactive reference for the 12 Hallmarks of Aging. Browse the biological processes that drive aging, with associated biomarkers, interventions, and PubMed citations. Based on López-Otín et al., Cell, 2023.',
  openGraph: {
    title: 'HallmarksExplorer — The 12 Hallmarks of Aging',
    description:
      'Browse all 12 hallmarks of aging with biomarkers, interventions, and primary literature.',
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
