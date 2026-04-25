import type { Metadata } from 'next'
import { AuthLayout } from '@/app/components'
import RegisterForm from '@/app/components/forms/RegisterForm'

export const metadata: Metadata = {
  title: 'Sign Up | Create Account - Next.js Starter Kit',
  description: 'Create your account and join Next.js Starter Kit. Sign up to access our modern web application framework and start building amazing applications with React, Redux, and TypeScript.',
  keywords: ['sign up', 'register', 'create account', 'signup', 'new user', 'account registration', 'join', 'authentication'],
  authors: [{ name: 'Next.js Starter Kit Team' }],
  openGraph: {
    title: 'Sign Up - Create Your Account | Next.js Starter Kit',
    description: 'Create your account and join Next.js Starter Kit. Sign up to access our modern web application framework.',
    type: 'website',
    siteName: 'Next.js Starter Kit',
  },
  twitter: {
    card: 'summary',
    title: 'Sign Up - Create Your Account | Next.js Starter Kit',
    description: 'Create your account and join Next.js Starter Kit.',
  },
  robots: {
    index: false, // Auth pages typically shouldn't be indexed
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: '/register',
  },
}

export default function Register() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}