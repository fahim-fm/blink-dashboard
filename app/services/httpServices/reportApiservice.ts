// app/services/report/reportApiService.ts
import { Report, ReportStatus } from '@/app/types/report'
import { reportsData } from '@/app/data/report/reportsData'
import { updateUserStatus } from './userApiService'

// Base endpoint (for future real API)
const API_BASE = '/reports'

export const reportService = {
  // Fetch all reports
  fetchReports: async (): Promise<Report[]> => {
    // For real API, replace this with:
    // const res = await fetch(`${API_BASE}`)
    // return await res.json()
    await new Promise(res => setTimeout(res, 300)) // simulate API delay
    return [...reportsData]
  },

  // Fetch single report by ID
  fetchReportById: async (id: string): Promise<Report> => {
    // For real API:
    // const res = await fetch(`${API_BASE}/${id}`)
    // if (!res.ok) throw new Error('Report not found')
    // return await res.json()
    await new Promise(res => setTimeout(res, 200))
    const report = reportsData.find(r => r.id === id)
    if (!report) throw new Error('Report not found')
    return report
  },

  // Block reported user
  blockUser: async (reportId: string): Promise<{ reportId: string; newStatus: ReportStatus }> => {
    const report = reportsData.find(r => r.id === reportId)
    if (!report) throw new Error('Report not found')
    if (!report.targetId) throw new Error('Reported user ID not found')

    // Update reported user's status (mock or API)
    await updateUserStatus({ id: Number(report.targetId), status: 'Blocked' })

    // Update report status locally
    report.status = 'resolved'

    return { reportId, newStatus: 'resolved' }
  },

  // Reject report
  rejectReport: async (reportId: string): Promise<{ reportId: string; newStatus: ReportStatus }> => {
    const report = reportsData.find(r => r.id === reportId)
    if (!report) throw new Error('Report not found')

    report.status = 'rejected'
    return { reportId, newStatus: 'rejected' }
  },

  // Restore previously blocked user
  restoreUser: async (reportId: string): Promise<{ reportId: string; newStatus: ReportStatus }> => {
    const report = reportsData.find(r => r.id === reportId)
    if (!report) throw new Error('Report not found')
    if (!report.targetId) throw new Error('Reported user ID not found')

    // Restore user status (mock/API)
    await updateUserStatus({ id: Number(report.targetId), status: 'Active' })

    // Update report status locally
    report.status = 'pending'

    return { reportId, newStatus: 'pending' }
  },
}
