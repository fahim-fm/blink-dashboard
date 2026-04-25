// app/types/report.ts

export type ReportCategory = 'profile' | 'chat' | 'match'
export type ReportStatus = 'pending' | 'resolved' | 'rejected'

export interface Report {
  id: string

  // Core report info
  title: string
  category: ReportCategory
  status: ReportStatus

  // Time (store raw value, UI formats it)
  reportedAt: string

  // Users
  reportedBy: string
  reportedUser: string

  // Optional for future use
  targetId?: string
}

export interface ReportsFilter {
  search: string
  category: 'All' | ReportCategory
  status: 'All' | ReportStatus
  sortBy: 'title' | 'reportedBy' | 'reportedAt' | 'status'
  sortOrder: 'asc' | 'desc'
}

export interface ReportState {
  reports: Report[]
  filteredReports: Report[]
  filters: ReportsFilter
  selectedReports: string[]
  reportsLoading: boolean
  reportsError: string | null
  currentPage: number
  reportsPerPage: number
}
