import { AuthLayout } from '@/app/components'
import ForgotPasswordForm from '@/app/components/forms/ForgotPasswordForm'

export default function ForgotPassword() {
  return (
    <AuthLayout description="Type your registered email for reset your password">
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
