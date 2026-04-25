import { AuthLayout } from '@/app/components'
import VerifyOtpForm from '@/app/components/forms/VerifyOtpForm'

export default function VerifyOtp() {
  return (
    <AuthLayout description="We&apos;ve sent a verification code to your email to reset your password.">
      <VerifyOtpForm />
    </AuthLayout>
  )
}
