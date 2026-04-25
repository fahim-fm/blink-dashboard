import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DashboardState } from '@/app/types/dashboard'
import { fetchDashboardStats, fetchRecentActivity, refreshDashboard } from '@/app/services/httpServices/dashboardApiService'

// Initial state
const initialState: DashboardState = {
  stats: null,
  recentActivity: [],
  loading: false,
  error: null,
  lastUpdated: null,
}

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setLastUpdated: (state) => {
      state.lastUpdated = new Date().toISOString()
    },
  },
  extraReducers: (builder) => {
    // Dashboard stats
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload
        state.lastUpdated = new Date().toISOString()
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Recent activity
    builder
      .addCase(fetchRecentActivity.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchRecentActivity.fulfilled, (state, action) => {
        state.loading = false
        state.recentActivity = action.payload
      })
      .addCase(fetchRecentActivity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Refresh all
    builder
      .addCase(refreshDashboard.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(refreshDashboard.fulfilled, (state) => {
        state.loading = false
        state.lastUpdated = new Date().toISOString()
      })
      .addCase(refreshDashboard.rejected, (state, action) => {
        state.loading = false
        state.error = 'Failed to refresh dashboard'
      })
  },
})

export const { clearError, setLastUpdated } = dashboardSlice.actions
export { dashboardSlice, fetchDashboardStats, fetchRecentActivity, refreshDashboard }
export default dashboardSlice.reducer