'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import {  Button, Card, DashboardLayout } from '@/app/components'
import { useAppDispatch, useAppSelector } from '@/app/redux/store'
import {
  fetchDashboardStats,
  fetchRecentActivity,
  refreshDashboard,
  clearError
} from '@/app/redux/slices/dashboardSlice'

import { StatCard } from '@/app/components/ui/StatCard'
import { statCardsData } from '@/app/data/dashboard/statCardsData'
import { TopUsers } from '@/app/components/pages'
import RecentReports from '@/app/components/pages/dashboard/RecentReports'
import { Refresh } from '@/app/utils/image/icon.image'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { stats, loading, error } = useAppSelector(
    (state) => state.dashboard
  )

  useEffect(() => {
    dispatch(fetchDashboardStats())
    dispatch(fetchRecentActivity())
  }, [dispatch])

  
  const handleClearError = () => dispatch(clearError())

  // Loading skeleton
  if (loading && !stats) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="Dashboard"
      buttons={[
        {
          label: 'Refresh',
          icon: <Image src={Refresh} alt="Refresh" width={20} height={20} />,
          variant: 'secondary',
          loading: loading,
          onConfirm: async () => {
            await dispatch(refreshDashboard())
          },
        }
      ]}
    >
      <div className="space-y-[2px]">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-3">
                <div className="text-red-400">⚠️</div>
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
              <Button onClick={handleClearError} variant="danger" size="sm">
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {statCardsData.map((card) => (
            <StatCard
              key={card.id}
              flag={card.flag}
              mainTitle={card.mainTitle}
              title1={card.title1}
              subTitle1={card.subTitle1}
              title2={card.title2}
              subTitle2={card.subTitle2}
            />
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-1">
          <TopUsers />
          <RecentReports />
        </div>
      </div>
    </DashboardLayout>
  )
}