'use client'

import { ReactNode, useState, useCallback, useEffect, useRef } from 'react'
import { SidebarLayout, Button, BoleanModal } from '@/app/components'
import { ChevronLeft } from 'lucide-react'

export interface DashboardButton {
  label: string
  icon?: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'create' | 'reject'
  disabled?: boolean
  loading?: boolean
  useModal?: boolean
  modalTitle?: string
  modalDescription?: string
  onConfirm?: () => Promise<void> | void
}

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
  onBack?: () => void
  buttons?: DashboardButton[]
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title = 'Dashboard',
  onBack,
  buttons = [],
}) => {
  const [modalOpenIndex, setModalOpenIndex] = useState<number | null>(null)
  const [showHeaderBorder, setShowHeaderBorder] = useState(false)
  const [buttonLoadingStates, setButtonLoadingStates] = useState<boolean[]>(
    () => buttons.map(() => false)
  )
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleButtonClick = useCallback(
    async (button: DashboardButton, index: number) => {
      if (button.useModal) {
        setModalOpenIndex(index)
        return
      }

      if (button.onConfirm) {
        try {
          setButtonLoadingStates(prev =>
            prev.map((val, i) => (i === index ? true : val))
          )
          await button.onConfirm()
        } finally {
          setButtonLoadingStates(prev =>
            prev.map((val, i) => (i === index ? false : val))
          )
        }
      }
    },
    []
  )

  const closeModal = () => setModalOpenIndex(null)

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpenIndex !== null ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [modalOpenIndex])

  // Show border on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current)
        setShowHeaderBorder(scrollRef.current.scrollTop > 0)
    }
    const container = scrollRef.current
    container?.addEventListener('scroll', handleScroll)
    return () => container?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <SidebarLayout>
      <div className="flex flex-col h-full min-h-0">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-background">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center py-4">
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-1 rounded hover:bg-green transition"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              <h1 className="text-[22px] sm:text-[28px] font-semibold text-text">{title}</h1>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              {buttons.map((btn, index) => (
                <Button
                  key={index}
                  variant={btn.variant || 'primary'}
                  leftIcon={btn.icon}
                  disabled={btn.disabled || buttonLoadingStates[index] || btn.loading}
                  loading={buttonLoadingStates[index] || btn.loading}
                  onClick={() => handleButtonClick(btn, index)}
                  
                >
                  {buttonLoadingStates[index] || btn.loading
                    ? `${btn.label}…`
                    : btn.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Header Border */}
          <div
            className={`h-[1px] bg-border transition-opacity duration-200 ${
              showHeaderBorder ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Scrollable Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto hide-scrollbar">
          {children}
        </div>

        {/* Render Modals */}
        {buttons.map(
          (btn, index) =>
            btn.useModal && modalOpenIndex === index && (
              <BoleanModal
                key={index}
                isOpen
                onClose={closeModal}
                title={btn.modalTitle || 'Confirm Action'}
                description={btn.modalDescription || 'Are you sure you want to proceed?'}
                onConfirm={async () => {
                  if (btn.onConfirm) await btn.onConfirm()
                  closeModal()
                }}
              />
            )
        )}
      </div>
    </SidebarLayout>
  )
}
