import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'About Us',
    template: '%s | Next.js Starter Kit',
  },
  description: 'Learn about Next.js Starter Kit - a comprehensive, modern web application framework built with React, Redux, and TypeScript for rapid development.',
  keywords: ['about', 'Next.js', 'React', 'Redux', 'TypeScript', 'web development', 'starter kit'],
  authors: [{ name: 'Next.js Starter Kit Team' }],
  openGraph: {
    title: 'About Us - Next.js Starter Kit',
    description: 'Learn about Next.js Starter Kit - a comprehensive, modern web application framework.',
    type: 'website',
    siteName: 'Next.js Starter Kit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Next.js Starter Kit',
    description: 'Learn about Next.js Starter Kit - a comprehensive, modern web application framework.',
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}