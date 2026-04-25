'use client'

import React, { Suspense, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { DashboardLayout } from '@/app/components'
import InquiryDetailsCard from '@/app/components/pages/inquiries/InquiryDetailsCard'
import ChatPanel from '@/app/components/pages/inquiries/ChatPanel'
import { useAppDispatch, useAppSelector } from '@/app/redux/store'
import { addInquiryMessage } from '@/app/redux/slices/inquirySlice'
import { WhiteCheck } from '@/app/utils/image/icon.image'
import Image from 'next/image'
import type { Inquiry } from '@/app/types/inquiry'

function InquiryDetailsContent() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const params = useParams<{ id: string }>()
  const inquiryId = params?.id

  /** Select inquiry */
  const inquiry = useAppSelector(state =>
    state.inquiry.filteredInquiries.find(
      (inq: Inquiry) => inq.id === inquiryId
    )
  )

  /** Back navigation */
  const handleBack = useCallback(() => {
    router.push('/inquiries')
  }, [router])

  /** Mark as complete */
  const handleConfirmStatusChange = useCallback(async () => {
    if (!inquiryId || !inquiry || inquiry.status === 'complete') return
    console.log('Mark inquiry complete:', inquiryId)
    // dispatch(updateInquiryStatus({ id: inquiryId, status: 'complete' }))
  }, [inquiryId, inquiry])

  /** Send message */
  const handleSendMessage = useCallback(
    (message: string) => {
      if (!inquiry || inquiry.status === 'complete') return
      dispatch(
        addInquiryMessage({
          inquiryId: inquiry.id,
          sender: 'admin',
          message,
        })
      )
    },
    [dispatch, inquiry]
  )

  /** Guard */
  if (!inquiryId) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Invalid inquiry ID
      </div>
    )
  }

  return (
    <DashboardLayout
      title="Inquiry Details"
      onBack={handleBack}
      buttons={[
        {
          label: 'Mark as Complete',
          icon: <Image src={WhiteCheck} alt="icon" width={20} height={20} />,
          variant: 'primary',
          disabled: inquiry ? inquiry.status === 'complete' : true,
          useModal: true,
          modalTitle: 'Confirm Completion',
          modalDescription:
            'Are you sure you want to mark this inquiry as complete?',
          onConfirm: handleConfirmStatusChange,
        },
      ]}
    >
      <div className="flex flex-col gap-[10px] lg:flex-row overflow-x-hidden">
        {/* Chat */}
        <div className="w-full lg:flex-1 min-w-0">
          {inquiry ? (
            <ChatPanel inquiry={inquiry} onSend={handleSendMessage} />
          ) : (
            <div className="flex h-full items-center justify-center text-text-muted">
              Loading chat...
            </div>
          )}
        </div>

        {/* Details Card */}
        {inquiry ? (
          <InquiryDetailsCard
            inquiry={inquiry}
            
          />
        ) : (
          <p className="text-text-muted">Loading inquiry details…</p>
        )}
      </div>
    </DashboardLayout>
  )
}

const InquiryDetailsPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading…
        </div>
      }
    >
      <InquiryDetailsContent />
    </Suspense>
  )
}

export default InquiryDetailsPage
