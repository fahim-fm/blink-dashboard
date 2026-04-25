// app/components/ui/RelativeTime.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { timeAgo } from '@/app/utils/date'

interface RelativeTimeProps {
  date: string
}

export const RelativeTime: React.FC<RelativeTimeProps> = ({ date }) => {
  const [label, setLabel] = useState('')

  useEffect(() => {
    const updateTime = () => setLabel(timeAgo(date))
    updateTime()

    // Optional: update every minute for dynamic clocks
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [date])

  return <span>{label}</span>
}


