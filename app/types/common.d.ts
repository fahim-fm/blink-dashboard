// Common/shared type definitions

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: Date
}

// Form-related types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox'
  required?: boolean
  placeholder?: string
  options?: Array<{ value: string; label: string }>
}

export interface FormState {
  loading: boolean
  error: string | null
  success: boolean
}

// Generic loading states
export interface LoadingState {
  loading: boolean
  error: string | null
}

// Sort and filter types
export interface SortOption {
  field: string
  order: 'asc' | 'desc'
}

export interface FilterOption {
  key: string
  value: any
  operator?: 'equals' | 'contains' | 'startsWith' | 'greaterThan' | 'lessThan'
}