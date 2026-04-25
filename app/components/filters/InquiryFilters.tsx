'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/store'
import { setStatusFilter, setSorting } from '@/app/redux/slices/inquirySlice'
import { FilterDropdowns, FilterConfig, FilterOption } from './filterDropdown'
import type { InquiryFilters as InquiryFiltersType } from '@/app/types/inquiry'

type StatusFilter = InquiryFiltersType['status']
type SortBy = InquiryFiltersType['sortBy']
type SortOrder = InquiryFiltersType['sortOrder']

export const InquiryFilters = () => {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector(state => state.inquiry)

  const filterConfigs: FilterConfig<any>[] = [
    // ✅ STATUS FILTER
    {
      label: 'Status',
      value: filters.status,
      options: [
        { label: 'All', value: 'All' },
        { label: 'Pending', value: 'pending' },
        { label: 'Complete', value: 'complete' },
      ] satisfies FilterOption<StatusFilter>[],
      onChange: (value: StatusFilter) =>
        dispatch(setStatusFilter(value)),
    },

    // ✅ SORT BY FILTER
    {
      label: 'Sort By',
      value: filters.sortBy,
      options: [
        { label: 'Inquiry Time', value: 'inquiryTime' },
        { label: 'Status', value: 'status' },
        { label: 'Title', value: 'title' },
      ] satisfies FilterOption<SortBy>[],
      onChange: (value: SortBy) =>
        dispatch(
          setSorting({
            sortBy: value,
            sortOrder: filters.sortOrder,
          })
        ),
    },

    // ✅ SORT ORDER FILTER
    {
      label: 'Order',
      value: filters.sortOrder,
      options: [
        { label: 'Ascending', value: 'asc' },
        { label: 'Descending', value: 'desc' },
      ] satisfies FilterOption<SortOrder>[],
      onChange: (value: SortOrder) =>
        dispatch(
          setSorting({
            sortBy: filters.sortBy,
            sortOrder: value,
          })
        ),
    },
  ]

  const resetFilters = () => {
    dispatch(setStatusFilter('All'))
    dispatch(setSorting({ sortBy: 'inquiryTime', sortOrder: 'asc' }))
  }

  return <FilterDropdowns filters={filterConfigs} onReset={resetFilters} />
}
