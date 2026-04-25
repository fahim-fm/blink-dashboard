'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BoleanModal, DashboardLayout } from '@/app/components'
import Image from 'next/image'
import {
  NotificationItem,
  FilterTabs,
  NotificationSettingsCard,
  type Notification,
} from '@/app/components/notifications'
import { Check, Clear, Delete } from '@/app/utils/image/notify.image'

export default function NotificationPage() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState('all')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'report',
      title: 'New User Report',
      message: 'User "toxic_player" has been reported for inappropriate behavior',
      time: '5 mins ago',
      isRead: false,
    },
    {
      id: 2,
      type: 'inquiry',
      title: 'New Inquiry Received',
      message: 'john_doe sent a new inquiry about account suspension',
      time: '10 mins ago',
      isRead: true,
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of $49.99 received from user alice_wonder',
      time: '15 mins ago',
      isRead: true,
    },
    {
      id: 4,
      type: 'registration',
      title: 'New User Registration',
      message: '5 new users registered in the last hour',
      time: '20 mins ago',
      isRead: true,
    },
  ])

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | 'bulk' | null>(null)

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.isRead
    if (activeTab === 'read') return n.isRead
    return true
  })

  const counts = {
    unread: notifications.filter(n => !n.isRead).length,
    read: notifications.filter(n => n.isRead).length,
  }

  const handleSelectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredNotifications.map(n => n.id))
    }
  }

  const handleClearSelection = () => setSelectedIds([])

  const handleSelect = (id: number, checked: boolean) => {
    if (checked) setSelectedIds([...selectedIds, id])
    else setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
  }

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, isRead: true } : n))
    )
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
  }

  const handleMarkAsUnread = (id: number) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, isRead: false } : n))
    )
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
  }

  const handleBulkMarkAsRead = () => {
    setNotifications(
      notifications.map(n =>
        selectedIds.includes(n.id) ? { ...n, isRead: true } : n
      )
    )
    setSelectedIds([])
  }

  const handleBulkMarkAsUnread = () => {
    setNotifications(
      notifications.map(n =>
        selectedIds.includes(n.id) ? { ...n, isRead: false } : n
      )
    )
    setSelectedIds([])
  }

  const openDeleteModal = (id: number | 'bulk') => {
    setDeleteId(id)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deleteId === 'bulk') {
      setNotifications(notifications.filter(n => !selectedIds.includes(n.id)))
      setSelectedIds([])
    } else if (deleteId !== null) {
      setNotifications(notifications.filter(n => n.id !== deleteId))
      setSelectedIds(selectedIds.filter(id => id !== deleteId))
    }
    setDeleteId(null)
    setDeleteModalOpen(false)
  }

  const hasReadSelected = selectedIds.some(
    id => notifications.find(n => n.id === id)?.isRead
  )
  const hasUnreadSelected = selectedIds.some(
    id => !notifications.find(n => n.id === id)?.isRead
  )

  return (
    <DashboardLayout title="Notifications" onBack={() => router.back()}>
      <div className="space-y-[4px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3 sm:gap-[10px]">
          <div className="w-full">
            <div className="flex flex-col items-center p-3 sm:p-5 gap-3 bg-form backdrop-blur-[4px] rounded-[20px] sm:rounded-[32px]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-3 sm:gap-4">
                <FilterTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  counts={counts}
                />

                {selectedIds.length > 0 ? (
                  <div className="flex flex-row items-center gap-2 sm:gap-4 flex-shrink-0 overflow-x-auto scrollbar-hide">
                    {hasUnreadSelected && (
                      <button
                        onClick={handleBulkMarkAsRead}
                        className="flex flex-row items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
                      >
                        <Image src={Check} width={16} height={16} alt="check-icon" className="sm:w-5 sm:h-5" />
                        <span className="font-normal text-sm sm:text-base leading-[26px] text-text-secondary">
                          Mark as read
                        </span>
                      </button>
                    )}

                    {hasReadSelected && (
                      <button
                        onClick={handleBulkMarkAsUnread}
                        className="flex flex-row items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
                      >
                        <Image src={Check} width={16} height={16} alt="check-icon" className="sm:w-5 sm:h-5" />
                        <span className="font-normal text-sm sm:text-base leading-[26px] text-text-secondary">
                          Mark as unread
                        </span>
                      </button>
                    )}

                    <button
                      onClick={() => openDeleteModal('bulk')}
                      className="flex flex-row items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
                    >
                      <Image src={Delete} width={14} height={14} alt="delete-icon" className="sm:w-4 sm:h-4" />
                      <span className="font-normal text-sm sm:text-base leading-[26px] text-text-secondary">
                        Delete
                      </span>
                    </button>

                    <button
                      onClick={handleClearSelection}
                      className="flex flex-row items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
                    >
                      <Image src={Clear} width={10} height={10} alt="clear-icon" className="sm:w-3 sm:h-3" />
                      <span className="font-normal text-sm sm:text-base leading-[26px] text-text-secondary">
                        Clear
                      </span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSelectAll}
                    className="flex flex-row items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity flex-shrink-0 whitespace-nowrap"
                  >
                    <Image src={Check} width={16} height={16} alt="check-icon" className="sm:w-5 sm:h-5" />
                    <span className="font-normal text-sm sm:text-base leading-[26px] text-text-secondary">
                      Select All
                    </span>
                  </button>
                )}
              </div>

              <div className="flex flex-col items-start w-full rounded-none">
                {filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 w-full">
                    <p className="text-text-secondary text-base sm:text-lg">
                      No notifications to display
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map(notification => (
                    <div key={notification.id} className="w-full">
                      <NotificationItem
                        notification={notification}
                        isSelected={selectedIds.includes(notification.id)}
                        onSelect={handleSelect}
                        onMarkAsRead={handleMarkAsRead}
                        onMarkAsUnread={handleMarkAsUnread}
                        onDelete={() => openDeleteModal(notification.id)}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <NotificationSettingsCard />
          </div>
        </div>
      </div>

      <BoleanModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete notification"
        description={
          deleteId === 'bulk'
            ? 'Do you want to delete all selected notifications?'
            : 'Do you want to delete this notification?'
        }
        onConfirm={handleDeleteConfirm}
      />
    </DashboardLayout>
  )
}