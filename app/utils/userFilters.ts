import type { User, UsersFilter } from '@/app/types/user'

export const applyFilters = (users: User[], filters: UsersFilter): User[] => {
  let filtered = [...users]
  
  // Search filter
  if (filters.search) {
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase())
    )
  }
  
  // Role filter
  if (filters.role !== 'All') {
    filtered = filtered.filter(user => user.role === filters.role)
  }
  
  // Status filter
  if (filters.status !== 'All') {
    filtered = filtered.filter(user => user.status === filters.status)
  }
  
  // Sort
  filtered.sort((a, b) => {
    const aValue = a[filters.sortBy as keyof User] ?? ''
    const bValue = b[filters.sortBy as keyof User] ?? ''
  
    if (filters.sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })
  
  
  return filtered
}

