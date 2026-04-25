
// ReportFilters.tsx
'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/store'
import { setFilters } from '@/app/redux/slices/reportSlice'
import { FilterDropdowns, FilterConfig, FilterOption } from './filterDropdown'
import type { ReportCategory, ReportStatus } from '@/app/types/report'

type ReportCategoryFilter = 'All' | ReportCategory
type ReportStatusFilter = 'All' | ReportStatus

export const ReportFilters = () => {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector(state => state.report)

  const filterConfigs: FilterConfig<any>[] = [
    {
      label: 'Category',
      value: filters.category,
      options: [
        { label: 'All', value: 'All' },
        { label: 'Profile', value: 'profile' },
        { label: 'Chat', value: 'chat' },
        { label: 'Match', value: 'match' },
      ] satisfies FilterOption<ReportCategoryFilter>[],
      onChange: (value: ReportCategoryFilter) => dispatch(setFilters({ category: value })),
    },
    {
      label: 'Status',
      value: filters.status,
      options: [
        { label: 'All', value: 'All' },
        { label: 'Pending', value: 'pending' },
        { label: 'Resolved', value: 'resolved' },
        { label: 'Rejected', value: 'rejected' },
      ] satisfies FilterOption<ReportStatusFilter>[],
      onChange: (value: ReportStatusFilter) => dispatch(setFilters({ status: value })),
    },
  ]

  const resetFilters = () => {
    dispatch(setFilters({ category: 'All', status: 'All' }))
  }

  return <FilterDropdowns filters={filterConfigs} onReset={resetFilters} />
}