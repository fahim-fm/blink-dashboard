'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { UserRoundPlus } from 'lucide-react'

import {
  DashboardLayout,
  Card,
  Button,
  BoleanModal,
  Modal,
  UserDetailsForm,
} from '@/app/components'

import { UserTable } from '@/app/components/tables'
import { CreateUserForm } from '@/app/components/forms/CreateUserForm'

import { useAppDispatch, useAppSelector } from '@/app/redux/store'
import {
  fetchUsers,
  updateUserStatus,
} from '@/app/services/httpServices/userApiService'
import {
  setSearch,
  clearUsersError,
  setCurrentPage,
} from '@/app/redux/slices/userSlice'

import { Block } from '@/app/utils/image/icon.image'
import { User } from '@/app/types/user'
import { DashboardButton } from '@/app/components/layouts/DashboardLayout'

export default function Users() {
  const dispatch = useAppDispatch()

  const {
    users,
    filteredUsers,
    usersLoading,
    usersError,
    filters,
    currentPage,
    usersPerPage,
  } = useAppSelector(state => state.user)

  const { search: searchTerm } = filters

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // Modal & User states
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false)
  const [viewUserOpen, setViewUserOpen] = useState(false)
  const [viewUser, setViewUser] = useState<User | null>(null)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [pendingIds, setPendingIds] = useState<number[]>([])
  const [pendingStatus, setPendingStatus] =
    useState<'Active' | 'Blocked'>('Blocked')

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  // Handlers
  const handleSearchChange = (value: string) => dispatch(setSearch(value))

  const handleViewUser = (user: User) => {
    setViewUser(user)
    setViewUserOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditUser(user)
    setEditUserOpen(true)
  }

  const openStatusModal = (ids: number[], status: 'Active' | 'Blocked') => {
    setPendingIds(ids)
    setPendingStatus(status)
    setStatusModalOpen(true)
  }

  const handleConfirmStatusChange = async () => {
    try {
      await Promise.all(
        pendingIds.map(id =>
          dispatch(updateUserStatus({ id, status: pendingStatus })).unwrap()
        )
      )
    } catch (err) {
      console.error(err)
    } finally {
      setPendingIds([])
      setSelectedIds([])
      setStatusModalOpen(false)
    }
  }

  const handleClearError = () => dispatch(clearUsersError())

  // Loading skeleton
  if (usersLoading && users.length === 0) {
    return (
      <DashboardLayout title="User Management">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">Users</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-8 bg-gray-200 rounded w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Define buttons exactly like original UI
  const buttons: DashboardButton[] = [
    {
      label: 'Create User',
      icon: <UserRoundPlus size={18} />,
      variant: 'success',
      onConfirm: () => setCreateUserModalOpen(true),
    },
    {
      label: 'Block User',
      icon: <Image src={Block} alt="Block" width={18} height={18} />,
      variant: 'danger',
      disabled: selectedIds.length === 0,
      useModal: true,
      modalTitle: 'Block User',
      modalDescription: 'Do you really want to block the user? The user will be blocked and the report will be changed to solved.',
      onConfirm: handleConfirmStatusChange,
    },
  ]

  return (
    <DashboardLayout title="User Management" buttons={buttons}>
      {/* Error */}
      {usersError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 ">
          <div className="flex justify-between items-center">
            <div className="text-red-700">{usersError}</div>
            <Button size="sm" variant="danger" onClick={handleClearError}>
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* User Table */}
      <UserTable
        search={searchTerm}
        onSearchChange={handleSearchChange}
        users={filteredUsers}
        usersLoading={usersLoading}
        currentPage={currentPage}
        rowsPerPage={usersPerPage}
        onPageChange={page => dispatch(setCurrentPage(page))}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        onStatusChange={(id, status) => openStatusModal([id], status)}
        onViewUser={handleViewUser}
        onEditUser={handleEditUser}
      />

      {/* Create User Modal */}
      {createUserModalOpen && (
        <CreateUserForm
          open={createUserModalOpen}
          onClose={() => setCreateUserModalOpen(false)}
        />
      )}

      {/* View User Modal */}
      {viewUserOpen && viewUser && (
        <Modal
          open={viewUserOpen}
          onClose={() => {
            setViewUserOpen(false)
            setViewUser(null)
          }}
          maxWidth="650px"
        >
          <UserDetailsForm
            user={viewUser}
            onClose={() => {
              setViewUserOpen(false)
              setViewUser(null)
            }}
          />
        </Modal>
      )}

      {/* Edit User Modal */}
      {editUserOpen && editUser && (
        <Modal
          open={editUserOpen}
          onClose={() => {
            setEditUserOpen(false)
            setEditUser(null)
          }}
          maxWidth="650px"
        >
          <UserDetailsForm
            user={editUser}
            onClose={() => {
              setEditUserOpen(false)
              setEditUser(null)
            }}
          />
        </Modal>
      )}

      {/* Status Confirmation Modal */}
      {statusModalOpen && (
        <BoleanModal
          isOpen={statusModalOpen}
          onClose={() => setStatusModalOpen(false)}
          title="Confirm Action"
          description={`Are you sure you want to ${
            pendingStatus === 'Blocked' ? 'block' : 'restore'
          } ${pendingIds.length} user(s)?`}
          onConfirm={handleConfirmStatusChange}
        />
      )}
    </DashboardLayout>
  )
}
