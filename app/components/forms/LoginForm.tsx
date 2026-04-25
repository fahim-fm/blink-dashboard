'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Button, InputField } from '@/app/components'
import { Eye, EyeOff, Lock, Mail } from '@/app/utils/image/icon.image'



interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('rememberMe', data.rememberMe.toString())

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Invalid admin credentials')
      }

      const result = await response.json()
      console.log('Admin login successful:', result)

      // window.location.href = '/admin/dashboard'

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Login failed. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Global Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Admin Email */}
      <InputField
        label="Email Address"
        type="email"
        placeholder="admin@example.com"
        leftIcon={<Image src={Mail.src ?? Mail} alt="Mail" width={18} height={18} />}
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
      />

      {/* Admin Password */}
      <InputField
  label="Password"
  type={showPassword ? 'text' : 'password'}
  placeholder="Enter password"
  leftIcon={
    <Image src={Lock.src ?? Lock} alt="Lock" width={18} height={18} />
  }
  rightIcon={
    <button
      type="button"
      onClick={() => setShowPassword(prev => !prev)}
      className="focus:outline-none"
    >
      <Image
        src={(showPassword ? Eye : EyeOff).src ?? (showPassword ? Eye : EyeOff)}
        alt="Toggle password visibility"
        width={18}
        height={18}
      />
    </button>
  }
  error={errors.password?.message}
  {...register('password', {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  })}
/>


      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-900">
          
        </label>

        <a
          href="/forgot-password"
          className="text-sm font-normal text-text-muted"
        >
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="authButton"
        size="authBtnSize"
        className="w-full"
        loading={isLoading}
        disabled={isLoading || !isValid}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>

    </form>
  )
}
