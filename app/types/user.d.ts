// User-related type definitions

export interface User {
  id: number
  idCode: string
  name: string
  email: string
  role: 'Admin' | 'Moderator' | 'User'
  status: 'Active' | 'Blocked'
  lastLogin: string
  dateOfBirth: string
  country: string
  gender: 'Male' | 'Female' | 'Other'
  diamondBalance: number
  goldBalance: number
  totalMatches: number
  totalWins: number
  totalLosses: number
  totalPaymentAmount: number
  avatar?: string
  createdAt: string
}


export interface UsersFilter {
  search: string
  role: 'All' | 'Admin' | 'Moderator' | 'User'
  status: 'All' | 'Active' | 'Blocked'
  sortBy: 'name' | 'email' | 'lastLogin' | 'createdAt' |'id'
  sortOrder: 'asc' | 'desc'
}

export interface UserState {
  // Current authenticated user
  currentUser: User | null
  isAuthenticated: boolean
  authLoading: boolean
  authError: string | null
  
  // Users management (for admin/dashboard)
  users: User[]
  filteredUsers: User[]
  filters: UsersFilter
  usersLoading: boolean
  usersError: string | null
  totalUsers: number
  currentPage: number
  usersPerPage: number
  selectedUsers: number[]
}

// Auth-related types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  role?: 'Admin' | 'Moderator' | 'User'
}

export interface AuthResponse {
  user: User
  token: string
}

export interface GetUsersParams {
  page?: number
  limit?: number
  search?: string
  role?: string
  status?: string
}


