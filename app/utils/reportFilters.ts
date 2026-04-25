import type { Report, ReportsFilter } from '@/app/types/report'

// Helper to apply filters + sorting
export const applyFilters = (reports: Report[], filters: ReportsFilter): Report[] => {
    let filtered = [...reports]
  
    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        r =>
          r.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          r.reportedBy.toLowerCase().includes(filters.search.toLowerCase()) ||
          r.reportedUser.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
  
    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(r => r.category === filters.category)
    }
  
    // Status filter
    if (filters.status !== 'All') {
      filtered = filtered.filter(r => r.status === filters.status)
    }
  
    // Sorting
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof Report] ?? ''
      const bValue = b[filters.sortBy as keyof Report] ?? ''
      if (filters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })
  
    return filtered
  }
  
