import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Contact Us',
    template: '%s | Next.js Starter Kit',
  },
  description: 'Get in touch with the Next.js Starter Kit team. Contact us for support, questions, or feedback about our modern web application framework.',
  keywords: ['contact', 'support', 'help', 'feedback', 'get in touch', 'customer service'],
  authors: [{ name: 'Next.js Starter Kit Team' }],
  openGraph: {
    title: 'Contact Us - Next.js Starter Kit',
    description: 'Get in touch with the Next.js Starter Kit team for support and feedback.',
    type: 'website',
    siteName: 'Next.js Starter Kit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Next.js Starter Kit',
    description: 'Get in touch with the Next.js Starter Kit team for support and feedback.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}