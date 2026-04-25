'use client'

import React, { useState } from 'react'
import { Search, Settings2 } from 'lucide-react'
import { Card, InputField } from '..'
import { ReusableTable } from './ReusableTable'
import { reportColumns } from './columns/reportColumns'
import { Report } from '@/app/types/report'
import { ReportFilters } from '../filters/ReportFilters'

interface ReportTableProps {
  data: Report[]
  selectedIds: string[]
  setSelectedIds: (ids: string[]) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  searchQuery: string
  onSearch: (value: string) => void
  rowsPerPage?: number
  onViewReport: (report: Report) => void
  onBlockUser?: (report: Report) => void
  onRestoreUser?: (report: Report) => void
  onResolveReport?: (report: Report) => void // 🔹 New
}

export const ReportTable: React.FC<ReportTableProps> = ({
  data,
  selectedIds,
  setSelectedIds,
  currentPage,
  setCurrentPage,
  searchQuery,
  onSearch,
  rowsPerPage = 10,
  onViewReport,
  onBlockUser,
  onRestoreUser,
  onResolveReport, // 🔹 New
}) => {
  const [showFilters, setShowFilters] = useState(false)

  const handleSetSelectedIds = (value: string[] | ((prev: string[]) => string[])) => {
    if (typeof value === 'function') setSelectedIds(value(selectedIds))
    else setSelectedIds(value)
  }

  return (
    <Card
      title="Reports List"
      headerRight={
        <div className="flex items-center gap-2 relative">
          <InputField
            placeholder="Search reports..."
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

          {showFilters && <ReportFilters />}
        </div>
      }
    >
     

      <ReusableTable<Report, string>
        columns={reportColumns(onViewReport, onBlockUser, onRestoreUser, onResolveReport) as any} // 🔹 Pass new callback
        data={data}
        selectedIds={selectedIds}
        setSelectedIds={handleSetSelectedIds}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
      />
    </Card>
  )
}
