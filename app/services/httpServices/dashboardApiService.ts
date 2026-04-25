import { createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '@/app/services/httpService'
import type { DashboardStats, RecentActivity } from '@/app/types/dashboard'

const baseEndpoint = '/dashboard'

export const dashboardService = {
  getStats: () => 
    httpService.get<DashboardStats>(`${baseEndpoint}/stats`),
  
  getRecentActivity: () => 
    httpService.get<RecentActivity[]>(`${baseEndpoint}/activity`),
}

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data - replace with actual API call
      const stats: DashboardStats = {
        totalUsers: 1234,
        revenue: 45678,
        orders: 856,
        conversionRate: 3.24,
        usersChange: '+12%',
        revenueChange: '+8%',
        ordersChange: '+15%',
        conversionChange: '+2%',
      }
      
      return stats
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch dashboard stats')
    }
  }
)

export const fetchRecentActivity = createAsyncThunk(
  'dashboard/fetchRecentActivity',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock data - replace with actual API call
      const activities: RecentActivity[] = [
        {
          id: '1',
          action: 'New user registration',
          time: '2 minutes ago',
          type: 'user'
        },
        {
          id: '2',
          action: 'Order #1234 completed',
          time: '5 minutes ago',
          type: 'order'
        },
        {
          id: '3',
          action: 'Payment received',
          time: '10 minutes ago',
          type: 'payment'
        },
        {
          id: '4',
          action: 'Product updated',
          time: '15 minutes ago',
          type: 'product'
        },
      ]
      
      return activities
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch recent activity')
    }
  }
)

export const refreshDashboard = createAsyncThunk(
  'dashboard/refreshAll',
  async (_, { dispatch }) => {
    await Promise.all([
      dispatch(fetchDashboardStats()),
      dispatch(fetchRecentActivity()),
    ])
  }
)
