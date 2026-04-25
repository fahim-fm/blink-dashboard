// UserFilters.tsx
'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/store'
import { setStatusFilter, setRoleFilter } from '@/app/redux/slices/userSlice'
import { FilterDropdowns, FilterConfig, FilterOption } from './filterDropdown'

type UserStatus = 'All' | 'Active' | 'Blocked'
type UserRole = 'All' | 'Admin' | 'Moderator' | 'User'

export const UserFilters = () => {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector(state => state.user)

  const filterConfigs: FilterConfig<any>[] = [
    {
      label: 'Status',
      value: filters.status,
      options: [
        { label: 'All', value: 'All' },
        { label: 'Active', value: 'Active' },
        { label: 'Blocked', value: 'Blocked' },
      ] satisfies FilterOption<UserStatus>[],
      onChange: (value: UserStatus) => dispatch(setStatusFilter(value)),
    },
    {
      label: 'Role',
      value: filters.role,
      options: [
        { label: 'All', value: 'All' },
        { label: 'Admin', value: 'Admin' },
        { label: 'Moderator', value: 'Moderator' },
        { label: 'User', value: 'User' },
      ] satisfies FilterOption<UserRole>[],
      onChange: (value: UserRole) => dispatch(setRoleFilter(value)),
    },
  ]

  const resetFilters = () => {
    dispatch(setStatusFilter('All'))
    dispatch(setRoleFilter('All'))
  }

  return <FilterDropdowns filters={filterConfigs} onReset={resetFilters} />
}