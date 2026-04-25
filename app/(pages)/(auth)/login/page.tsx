import type { Metadata } from 'next'
import { AuthLayout } from '@/app/components'
import LoginForm from '@/app/components/forms/LoginForm'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account and access your dashboard.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}