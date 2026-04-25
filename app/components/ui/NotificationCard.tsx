'use client'

import { ReactNode } from 'react'
import { cn } from '@/app/utils'
import { Check, Trash2, Clock } from 'lucide-react'

interface NotificationCardProps {
  title: string
  message: string
  time: string
  icon: ReactNode
  isSelected?: boolean
  onSelect?: () => void
  onMarkRead?: () => void
  onDelete?: () => void
  highlight?: boolean
}

export default function NotificationCard({
  title,
  message,
  time,
  icon,
  isSelected = false,
  onSelect,
  onMarkRead,
  onDelete,
  highlight = true
}: NotificationCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-2xl px-3 py-4',
        'bg-white/5',
        highlight && 'border-l-2 border-l-[#D5FD78]'
      )}
    >
      <div className="flex gap-3">
        {/* Checkbox */}
        <button
          onClick={onSelect}
          className={cn(
            'h-4 w-4 rounded border',
            isSelected ? 'bg-[#D5FD78]' : 'bg-[#222] border-border'
          )}
        />

        {/* Reusable Icon */}
        <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
          {icon}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex flex-wrap gap-2">
            <h3 className="text-lg font-bold text-text">
              {title}
            </h3>
            <p className="text-lg text-text-secondary">
              {message}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-text-muted">
              <Clock size={14} />
              <span className="text-sm font-medium">{time}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onMarkRead}
                className="flex items-center gap-1 text-[#D5FD78] text-sm font-medium"
              >
                <Check size={16} />
                Mark as Read
              </button>

              <button onClick={onDelete}>
                <Trash2 size={18} className="text-text-muted" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
