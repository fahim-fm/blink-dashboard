import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Report, ReportState, ReportsFilter } from '@/app/types/report'
import { reportService } from '@/app/services'
import { applyReportFilters } from '@/app/utils'


// Initial state
const initialState: ReportState = {
  reports: [],
  filteredReports: [],
  filters: { search: '', category: 'All', status: 'All', sortBy: 'reportedAt', sortOrder: 'desc' },
  selectedReports: [],
  reportsLoading: false,
  reportsError: null,
  currentPage: 1,
  reportsPerPage: 10,
}

// Async thunks
export const fetchReports = createAsyncThunk<Report[], void, { rejectValue: string }>(
  'report/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      return await reportService.fetchReports()
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const blockUser = createAsyncThunk(
  'report/blockUser',
  async (reportId: string, { rejectWithValue }) => {
    try {
      return await reportService.blockUser(reportId)
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const rejectReport = createAsyncThunk(
  'report/rejectReport',
  async (reportId: string, { rejectWithValue }) => {
    try {
      return await reportService.rejectReport(reportId)
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)
export const restoreUser = createAsyncThunk(
    'report/restoreUser',
    async (reportId: string, { rejectWithValue }) => {
      try {
        return await reportService.restoreUser(reportId)
      } catch (err: any) {
        return rejectWithValue(err.message)
      }
    }
  )
// Slice
export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ReportsFilter>>) => {
      state.filters = { ...state.filters, ...action.payload }
      state.currentPage = 1 // Reset to first page
      state.filteredReports = applyReportFilters(state.reports, state.filters)
    },
    setSelectedReports: (state, action: PayloadAction<string[]>) => {
      state.selectedReports = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: builder => {
    builder
      // Fetch reports
      .addCase(fetchReports.pending, state => {
        state.reportsLoading = true
        state.reportsError = null
      })
      .addCase(fetchReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.reportsLoading = false
        state.reports = action.payload
        state.filteredReports = applyReportFilters(action.payload, state.filters)
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.reportsLoading = false
        state.reportsError = action.payload as string
      })
  
      // Block user (pending → resolved)
      .addCase(blockUser.fulfilled, (state, action) => {
        const report = state.reports.find(r => r.id === action.payload.reportId)
        if (report) report.status = 'resolved'
        state.filteredReports = applyReportFilters(state.reports, state.filters)
      })
  
      // Restore user (resolved → pending)
      .addCase(restoreUser.fulfilled, (state, action) => {
        const report = state.reports.find(r => r.id === action.payload.reportId)
        if (report) report.status = 'pending'
        state.filteredReports = applyReportFilters(state.reports, state.filters)
      })
  
      // Reject report (pending → rejected)
      .addCase(rejectReport.fulfilled, (state, action) => {
        const report = state.reports.find(r => r.id === action.payload.reportId)
        if (report) report.status = 'rejected'
        state.filteredReports = applyReportFilters(state.reports, state.filters)
      })
  }
  
})

export const { setFilters, setSelectedReports, setCurrentPage } = reportSlice.actions
export default reportSlice.reducer
