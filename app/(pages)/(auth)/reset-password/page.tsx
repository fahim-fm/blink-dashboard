import { AuthLayout } from '@/app/components'
import ResetPasswordForm from '@/app/components/forms/ResetPasswordForm'

export default function ResetPassword() {
  return (
    <AuthLayout description="Reset your password now">
      <ResetPasswordForm />
    </AuthLayout>
  )
}
