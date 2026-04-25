import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Authentication',
    template: '%s | Next.js Starter Kit',
  },
  description: 'Sign in or create an account to access Next.js Starter Kit - a modern web application framework.',
  robots: {
    index: false, // Auth pages typically shouldn't be indexed
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

