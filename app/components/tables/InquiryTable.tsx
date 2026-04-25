'use client'

import React, { useState } from 'react'
import { Search, Settings2 } from 'lucide-react'
import { Card, InputField } from '..'
import { ReusableTable } from './ReusableTable'
import { inquiryColumns } from './columns/inquiryColumns'
import { Inquiry } from '@/app/types/inquiry'
import { InquiryFilters } from '../filters/InquiryFilters'

interface InquiryTableProps {
  data: Inquiry[]
  selectedIds: string[]
  setSelectedIds: (ids: string[] | ((prev: string[]) => string[])) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  searchQuery: string
  onSearch: (value: string) => void
  rowsPerPage?: number
  onViewInquiry: (inquiry: Inquiry) => void
  onNavigateToInquiry: (id: string) => void
}

export const InquiryTable: React.FC<InquiryTableProps> = ({
  data,
  selectedIds,
  setSelectedIds,
  currentPage,
  setCurrentPage,
  searchQuery,
  onSearch,
  rowsPerPage = 10,
  onViewInquiry,
  onNavigateToInquiry,
}) => {
  const [showFilters, setShowFilters] = useState(false)

  // purely UI; table selection handler
  const handleSetSelectedIds = (value: string[] | ((prev: string[]) => string[])) => {
    if (typeof value === 'function') setSelectedIds(value(selectedIds))
    else setSelectedIds(value)
  }

  return (
    <Card
      title="Inquiries"
      headerRight={
        <div className="flex items-center gap-2 relative">
          <InputField
            placeholder="Search inquiries..."
            leftIcon={<Search size={20} />}
            value={searchQuery}
            onChange={e => onSearch(e.target.value)}
          />
          <button
            className="p-2 rounded-lg hover:bg-green"
            onClick={() => setShowFilters(prev => !prev)}
          >
            <Settings2 size={20} className="rotate-90" />
          </button>
          {showFilters && <InquiryFilters />}
        </div>
      }
    >
      {selectedIds.length > 0 && (
        <div className="mb-4 text-sm text-muted">
          {selectedIds.length} inquiry(s) selected
        </div>
      )}

      <ReusableTable<Inquiry, string>
        columns={inquiryColumns()}
        data={data}
        selectedIds={selectedIds}
        setSelectedIds={handleSetSelectedIds}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowClick={(row) => onNavigateToInquiry(row.id)}
      />
    </Card>
  )
}
