// Dashboard-related type definitions

export interface DashboardStats {
  totalUsers: number
  revenue: number
  orders: number
  conversionRate: number
  usersChange: string
  revenueChange: string
  ordersChange: string
  conversionChange: string
}

export interface RecentActivity {
  id: string
  action: string
  time: string
  type: 'user' | 'order' | 'payment' | 'product'
}

export interface DashboardState {
  stats: DashboardStats | null
  recentActivity: RecentActivity[]
  loading: boolean
  error: string | null
  lastUpdated: string | null
}