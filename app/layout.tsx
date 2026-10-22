import type { Metadata, Viewport } from 'next'
import { Lexend, Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const heading = Lexend({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const body = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://locumplanner.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Locum Planner | Healthcare Recruitment, Made Simpler',
    template: '%s | Locum Planner',
  },
  description:
    'Locum Planner connects healthcare organisations with healthcare professionals across the UK. Straightforward registration, clear communication and considered matching.',
  keywords: [
    'locum recruitment',
    'healthcare recruitment UK',
    'locum planner',
    'healthcare staffing',
    'clinician registration',
  ],
  authors: [{ name: 'Locum Planner' }],
  creator: 'Locum Planner',
  publisher: 'Locum Planner',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'Locum Planner',
    title: 'Locum Planner | Healthcare Recruitment, Made Simpler',
    description:
      'Connecting healthcare organisations with healthcare professionals across the UK.',
    images: [{ url: '/locum-planner-logo.png', width: 260, height: 104, alt: 'Locum Planner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Locum Planner | Healthcare Recruitment, Made Simpler',
    description: 'Connecting healthcare organisations with healthcare professionals across the UK.',
    images: ['/locum-planner-logo.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${heading.variable} ${body.variable}`}>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
