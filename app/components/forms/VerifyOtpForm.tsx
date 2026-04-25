'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components'
import { cn } from '@/app/utils'

export default function VerifyOtpForm() {
  const router = useRouter()

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [timer, setTimer] = useState(30)
  const inputsRef = useRef<HTMLInputElement[]>([])

  /* Auto focus first input */
  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  /* Countdown */
  useEffect(() => {
    if (timer === 0) return

    const interval = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  /* OTP Change */
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return

    const updatedOtp = [...otp]
    updatedOtp[index] = value
    setOtp(updatedOtp)

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  /* Backspace Navigation */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  /* Verify OTP */
  const handleSubmit = async () => {
    const enteredOtp = otp.join('')
    console.log('OTP:', enteredOtp)

    router.push('/reset-password')
  }

  /* Resend OTP */
  const handleResend = () => {
    setOtp(Array(6).fill(''))
    setTimer(30)
    inputsRef.current[0]?.focus()
  }

  return (
    <div className="space-y-6 w-full min-w-0">

      {/* OTP Inputs */}
      <div className="flex flex-wrap justify-center sm:justify-between gap-2 sm:gap-0">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => {
              if (el) inputsRef.current[index] = el
            }}
            type="text"
            placeholder="-"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e.target.value, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            className={cn(
              'shrink-0',
              'w-[44px] h-[60px]',
              'sm:w-[50px] sm:h-[68px]',
              'md:w-[56.67px] md:h-[74px]',
              'rounded-[20px]',
              'border border-border',
              'bg-transparent',
              'text-[22px] sm:text-[24px] md:text-[28px]',
              'text-center',
              'font-lufga',
              'text-text-muted',
              'focus:outline-none focus:border-[#D5FD78]'
            )}
          />
        ))}
      </div>

      {/* Continue Button */}
      <Button
        type="button"
        variant="authButton"
        size="authBtnSize"
        className="w-full"
        onClick={handleSubmit}
        disabled={otp.some(d => d === '')}
      >
        Continue
      </Button>

      {/* Countdown */}
      <p className="mt-[44px] text-center text-sm">
        {timer > 0 ? (
          <span className="text-text-muted">
            Resend code in{' '}
            <span className="text-green">
              0:{timer.toString().padStart(2, '0')}
            </span>
          </span>
        ) : (
          <button
            onClick={handleResend}
            className="font-lufga text-text-muted font-normal hover:underline"
          >
            Didn’t receive a code?
            <span className="text-green"> Resend now</span>
          </button>
        )}
      </p>
    </div>
  )
}
