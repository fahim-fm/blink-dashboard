// Service-related type definitions

// HTTP service configuration
export interface HttpConfig {
  baseURL?: string
  timeout?: number
  retries?: number
  retryDelay?: number
  withCredentials?: boolean
}

// HTTP service configuration for the main service
export interface HttpServiceConfig {
  baseURL?: string
  timeout?: number
  withCredentials?: boolean
  headers?: Record<string, string>
}

// API endpoint configuration
export interface ApiEndpoint {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  requiresAuth?: boolean
  timeout?: number
}

// Service response wrapper
export interface ServiceResponse<T = any> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
  meta?: {
    page?: number
    limit?: number
    total?: number
    timestamp?: string
  }
}

// Upload progress callback
export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

// Service error types
export interface ServiceError {
  code: string
  message: string
  details?: any
  timestamp: string
}

// Retry configuration
export interface RetryConfig {
  retries: number
  retryDelay: number
  retryCondition?: (error: any) => boolean
}

// Cache configuration
export interface CacheConfig {
  enabled: boolean
  ttl: number // Time to live in seconds
  key?: string
}