'use client'

import React, { useState } from 'react'
import { Search, Settings2 } from 'lucide-react'
import { Card, InputField } from '..'
import { ReusableTable } from './ReusableTable'
import { userColumns } from './columns/userColumns'
import { UserFilters } from '../filters/UserFilters'
import { User } from '@/app/types/user'

interface UserTableProps {
  search: string
  onSearchChange: (value: string) => void
  users: User[]
  usersLoading: boolean
  currentPage: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  selectedIds: number[]
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>
  onStatusChange: (id: number, status: 'Active' | 'Blocked') => void
  onViewUser: (user: User) => void
  onEditUser: (user: User) => void 
}

export const UserTable: React.FC<UserTableProps> = ({
  search,
  onSearchChange,
  users,
  usersLoading,
  currentPage,
  rowsPerPage,
  onPageChange,
  selectedIds,
  setSelectedIds,
  onStatusChange,
  onViewUser,
  onEditUser, 
}) => {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <Card
      title="Users List"
      headerRight={
        <div className="flex items-center gap-2 relative ">
          <InputField
            placeholder="Search users..."
            leftIcon={<Search size={20} />}
            value={search}
            onChange={e => onSearchChange(e.target.value)}
          />

          <button
            className="p-2 rounded-lg hover:bg-green"
            onClick={() => setShowFilters(prev => !prev)}
          >
            <Settings2 size={20} className="rotate-90" />
          </button>

          {showFilters && <UserFilters />}
        </div>
      }
    >
      <ReusableTable
        columns={userColumns(
          usersLoading,
          onStatusChange,
          onViewUser,
          onEditUser
        )}
        data={users}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        currentPage={currentPage}
        setCurrentPage={onPageChange}
        rowsPerPage={rowsPerPage}
      />
    </Card>
  )
}
