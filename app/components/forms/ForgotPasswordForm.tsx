'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, InputField } from '@/app/components'
import { Mail } from '@/app/utils/image/icon.image'

interface ForgotPasswordFormData {
  email: string
}

export default function ForgotPasswordForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ForgotPasswordFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('email', data.email)

      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to send OTP')
      }

      // OPTIONAL: keep email in session/local storage
      sessionStorage.setItem('resetEmail', data.email)

      reset()

      // Redirect to OTP page
      router.push('/verify-otp')

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Email Field */}
      <InputField
        label="Email Address"
        type="email"
        placeholder="admin@example.com"
        leftIcon={
          <Image
            src={Mail.src ?? Mail}
            alt="Mail"
            width={18}
            height={18}
          />
        }
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="authButton"
        size="authBtnSize"
        className="w-full"
        loading={isLoading}
        disabled={isLoading || !isValid}
      >
        {isLoading ? 'Sending OTP...' : 'Send OTP'}
      </Button>

    </form>
  )
}
