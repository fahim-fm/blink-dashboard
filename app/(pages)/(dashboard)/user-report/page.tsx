'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { BoleanModal, DashboardLayout } from '@/app/components'
import { DoubleCheck } from '@/app/utils/image/icon.image'
import { ReportTable } from '@/app/components/tables'
import { ReportDetails } from '@/app/components/ui/ReportDetails'
import { RootState, AppDispatch } from '@/app/redux/store'
import {
  fetchReports,
  setSelectedReports,
  blockUser,
  restoreUser,
  rejectReport,
  setFilters,
  setCurrentPage,
} from '@/app/redux/slices/reportSlice'
import { Report } from '@/app/types/report'

export default function UserReport() {
  const dispatch = useDispatch<AppDispatch>()
  const [activeReport, setActiveReport] = useState<Report | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Track per-row modals
  const [rowModalReport, setRowModalReport] = useState<Report | null>(null)
  const [rowModalType, setRowModalType] = useState<'block' | 'resolve' | null>(null)

  const { filteredReports, selectedReports, currentPage, reportsLoading, filters } =
    useSelector((state: RootState) => state.report)

  const isResolveDisabled = selectedReports.length === 0 || reportsLoading

  useEffect(() => {
    dispatch(fetchReports())
  }, [dispatch])

  // Bulk resolve
  const handleBulkResolve = () => {
    if (!selectedReports.length) return
    selectedReports.forEach(reportId => dispatch(blockUser(reportId)))
    dispatch(setSelectedReports([]))
  }

  // Search
  const handleSearch = (value: string) => {
    dispatch(setFilters({ search: value }))
    dispatch(setCurrentPage(1))
  }

  // Row actions
  const handleViewReport = (report: Report) => {
    setActiveReport(report)
    setIsDetailsOpen(true)
  }

  const handleBlockClick = (report: Report) => {
    if (report.status === 'pending') {
      setRowModalReport(report)
      setRowModalType('block')
    }
  }

  const handleResolveClick = (report: Report) => {
    if (report.status === 'pending') {
      setRowModalReport(report)
      setRowModalType('resolve')
    }
  }

  const handleRestoreUser = (report: Report) => {
    if (report.status === 'resolved') {
      dispatch(restoreUser(report.id))
    }
  }

  const closeRowModal = () => {
    setRowModalReport(null)
    setRowModalType(null)
  }

  const confirmRowAction = () => {
    if (!rowModalReport || !rowModalType) return
    if (rowModalType === 'block') dispatch(blockUser(rowModalReport.id))
    if (rowModalType === 'resolve') dispatch(rejectReport(rowModalReport.id))
    closeRowModal()
  }

  const closeDetails = () => {
    setActiveReport(null)
    setIsDetailsOpen(false)
  }

  return (
    <DashboardLayout
      title="User Report Management"
      buttons={[
        {
          label: 'Resolve',
          icon: <Image src={DoubleCheck} alt="Resolve" width={20} height={20} />,
          variant: 'success',
          disabled: isResolveDisabled,
          useModal: true,
          modalTitle: 'Resolve Reports',
          modalDescription: 'Do you want to change the report to completed?',
          onConfirm: handleBulkResolve,
        },
      ]}
    >
      {/* Table */}
      <ReportTable
        data={filteredReports}
        selectedIds={selectedReports}
        setSelectedIds={ids => dispatch(setSelectedReports(ids))}
        currentPage={currentPage}
        setCurrentPage={page => dispatch(setCurrentPage(page))}
        searchQuery={filters.search}
        onSearch={handleSearch}
        rowsPerPage={10}
        onViewReport={handleViewReport}
        onBlockUser={handleBlockClick}
        onRestoreUser={handleRestoreUser}
        onResolveReport={handleResolveClick}
      />

      {/* Details Modal */}
      {activeReport && (
        <ReportDetails
          isOpen={isDetailsOpen}
          report={activeReport}
          onClose={closeDetails}
          onConfirm={() => {
            dispatch(blockUser(activeReport.id))
            closeDetails()
          }}
        />
      )}

      {/* Row Modals: Block / Resolve */}
      {rowModalReport && rowModalType && (
        <BoleanModal
          isOpen={true}
          onClose={closeRowModal}
          title={rowModalType === 'block' ? 'Block User' : 'Reject Report'}
          description={
            rowModalType === 'block'
              ? 'Do you really want to block the user? The user will be blocked and the report will be changed to resolved.'
              : 'Do you want to change the report to completed?'
          }
          onConfirm={confirmRowAction}
        />
      )}
    </DashboardLayout>
  )
}
