'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/app/components'
import { InquiryTable } from '@/app/components/tables/InquiryTable'
import { useAppDispatch, useAppSelector } from '@/app/redux/store'
import {
  fetchInquiries,
  updateInquiryStatus,
  bulkUpdateInquiryStatus,
} from '@/app/services'
import {
  setSearch,
  setCurrentPage,
  toggleInquirySelection,
  clearSelection,
} from '@/app/redux/slices/inquirySlice'
import { WhiteCheck } from '@/app/utils/image/icon.image'
import type { Inquiry, InquiryStatus } from '@/app/types/inquiry'
import Image from 'next/image'

export default function InquiryPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const {
    filteredInquiries,
    inquiriesError,
    currentPage,
    inquiriesPerPage,
    selectedInquiries,
    filters,
  } = useAppSelector(state => state.inquiry)

  useEffect(() => {
    dispatch(fetchInquiries())
  }, [dispatch])

  /** Handlers */
  const handleSearchChange = useCallback(
    (value: string) => dispatch(setSearch(value)),
    [dispatch]
  )

  const handleSelectionChange = useCallback(
    (idsOrFunc: string[] | ((prev: string[]) => string[])) => {
      const ids = typeof idsOrFunc === 'function' ? idsOrFunc(selectedInquiries) : idsOrFunc
      const added = ids.filter(id => !selectedInquiries.includes(id))
      const removed = selectedInquiries.filter(id => !ids.includes(id))
      added.forEach(id => dispatch(toggleInquirySelection(id)))
      removed.forEach(id => dispatch(toggleInquirySelection(id)))
    },
    [dispatch, selectedInquiries]
  )

  const handleViewInquiry = useCallback((inquiry: Inquiry) => {
    console.log('Viewing inquiry:', inquiry)
  }, [])

  const handleNavigateToInquiry = useCallback(
    (id: string) => router.push(`/inquiries/${id}`),
    [router]
  )

  const handleConfirmStatusChange = useCallback(async () => {
    try {
      if (selectedInquiries.length > 1) {
        await dispatch(
          bulkUpdateInquiryStatus({
            ids: selectedInquiries,
            status: 'complete' as InquiryStatus,
          })
        ).unwrap()
      } else if (selectedInquiries.length === 1) {
        await dispatch(
          updateInquiryStatus({
            id: selectedInquiries[0],
            status: 'complete' as InquiryStatus,
          })
        ).unwrap()
      }
    } finally {
      dispatch(clearSelection())
    }
  }, [dispatch, selectedInquiries])

  return (
    <DashboardLayout
      title="1:1 Inquiry Management"
      buttons={[
        {
          label: 'Mark as Complete',
          icon: <Image src={WhiteCheck} alt="icon" width={20} height={20} />,
          variant: 'primary',
          disabled: selectedInquiries.length === 0, 
          useModal: true,
          modalTitle: 'Confirm Completion',
          modalDescription: `Are you sure you want to mark ${selectedInquiries.length} inquiry(s) as complete?`,
          onConfirm: handleConfirmStatusChange,
        },
      ]}
    >
      {inquiriesError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          {inquiriesError}
        </div>
      )}

      <InquiryTable
        data={filteredInquiries}
        selectedIds={selectedInquiries}
        setSelectedIds={handleSelectionChange}
        currentPage={currentPage}
        setCurrentPage={page => dispatch(setCurrentPage(page))}
        searchQuery={filters.search}
        onSearch={handleSearchChange}
        rowsPerPage={inquiriesPerPage}
        onViewInquiry={handleViewInquiry}
        onNavigateToInquiry={handleNavigateToInquiry}
      />
    </DashboardLayout>
  )
}
