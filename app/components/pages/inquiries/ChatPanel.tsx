'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/app/components/ui/Button'
import type { Inquiry } from '@/app/types/inquiry'
import { cn } from '@/app/utils'
import { Sent02 } from '@/app/utils/image/icon.image'
import Image from 'next/image'
import { format } from 'date-fns'

interface ChatPanelProps {
  inquiry: Inquiry
  onSend: (message: string) => void
}

const ChatPanel: React.FC<ChatPanelProps> = ({ inquiry, onSend }) => {
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  /** Auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [inquiry.messages])

  const handleSend = useCallback(() => {
    const trimmedMessage = message.trim()
    if (!trimmedMessage) return
    onSend(trimmedMessage)
    setMessage('')
  }, [message, onSend])

  return (
    <div className="flex flex-col h-screen bg-form p-5 rounded-[32px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar flex flex-col">
        {inquiry.messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-text-muted text-sm sm:text-base">
            No messages yet
          </div>
        ) : (
          inquiry.messages.map((msg, index) => {
            const isAdmin = msg.sender === 'admin'
            return (
              <div
                key={`${msg.timestamp}-${index}`}
                className={`flex ${isAdmin ? 'justify-end' : 'justify-start'} mb-2`}
              >
                <div className="md:max-w-[70%] max-w-[85%]">
                  <div
                    className={cn(
                      'rounded-[16px] p-3 gap-[6px] flex flex-col',
                      isAdmin ? 'bg-green text-text-primary' : 'bg-gray text-text-secondary'
                    )}
                  >
                    {/* Header */}
                    <div className="text-left font-medium text-sm sm:text-[16px]">
                      <span className={cn(isAdmin && 'text-black')}>
                        {isAdmin ? 'Admin' : inquiry.userName}{' '}
                        {format(new Date(msg.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                      </span>
                    </div>

                    {/* Message */}
                    <div className={cn('font-normal text-base sm:text-[18px]', isAdmin && 'text-black')}>
                      {msg.message}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 mt-4 flex flex-col items-end gap-3">
        <textarea
          value={message}
          placeholder="Type your message here..."
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          className="
            md:flex-1 w-full rounded-[16px] border border-border
            bg-background p-3 text-sm sm:text-base
            outline-none placeholder:text-text-muted
            resize-none min-h-[100px] max-h-[150px] overflow-y-auto hide-scrollbar
          "
        />

        <Button
          variant="success"
          size="md"
          leftIcon={<Image src={Sent02} alt="Send" width={20} height={20} />}
          onClick={handleSend}
          className="w-fit font-semibold text-[14px] sm:text-sm"
        >
          Send Reply
        </Button>
      </div>
    </div>
  )
}

export default ChatPanel
