import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'AlphaCreative — AI-Powered Growth Systems',
  description: 'Data-driven growth systems that connect your website, analytics, and acquisition channels into a single measurable engine.',
  metadataBase: new URL('https://thealphacreative.com'),
  openGraph: {
    title: 'AlphaCreative',
    description: 'Where design meets data.',
    url: 'https://thealphacreative.com',
    siteName: 'AlphaCreative',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans bg-cream text-navy antialiased">
        {children}
      </body>
    </html>
  )
}
