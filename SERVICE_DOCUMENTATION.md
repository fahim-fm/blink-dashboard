# HTTP Service Documentation

The HTTP service provides a centralized, configured Axios instance with built-in interceptors, error handling, and authentication management.

## 📁 Service Structure

```
app/services/
├── index.ts                    # Main export file
├── httpService.ts              # Core HTTP service with Axios config
└── httpServices/               # API service modules
    ├── index.ts                # Export all API services
    ├── userApiService.ts       # User management API
    ├── authApiService.ts       # Authentication API
    └── productApiService.ts    # Product management API (example)
```

## 🚀 Features

### **Core HTTP Service** (`httpService.ts`)
- ✅ Pre-configured Axios instance
- ✅ Automatic authentication token handling
- ✅ Request/Response interceptors
- ✅ Error handling and logging
- ✅ File upload support
- ✅ Timeout and retry configuration
- ✅ Development logging

### **Key Features:**
- **Authentication**: Automatic token injection and management
- **Error Handling**: Centralized error processing with status code handling
- **Logging**: Development-friendly request/response logging
- **Type Safety**: Full TypeScript support with generics
- **Flexibility**: Customizable interceptors and configuration

## 📖 Usage Examples

### **Basic Usage**
```typescript
import { httpService } from '@/app/services'

// GET request
const users = await httpService.get<User[]>('/users')

// POST request
const newUser = await httpService.post<User>('/users', userData)

// PUT request
const updatedUser = await httpService.put<User>(`/users/${id}`, userData)

// DELETE request
await httpService.delete(`/users/${id}`)
```

### **Authentication**
```typescript
import { httpService } from '@/app/services'

// Set auth token (stored in localStorage)
httpService.setAuthToken('your-jwt-token')

// Clear auth token
httpService.clearAuthToken()

// Load token from localStorage (happens automatically)
httpService.loadAuthToken()
```

### **Automatic File Upload Detection**
```typescript
import { httpService } from '@/app/services'

// Any POST/PUT/PATCH method automatically detects and handles file uploads

// 1. Single file in POST
const file = document.getElementById('fileInput').files[0]
await httpService.post('/upload', file) // Auto-detects as file upload

// 2. Object with files - auto-converts to FormData
await httpService.post('/users', {
  name: 'John Doe',
  avatar: file,  // File object
  email: 'john@example.com'
})

// 3. Multiple files in object
await httpService.post('/documents', {
  title: 'My Documents',
  files: [file1, file2, file3], // Array of files
  category: 'work'
})

// 4. FormData (preserves exact structure)
const formData = new FormData()
formData.append('file', file)
formData.append('metadata', JSON.stringify({ id: 123 }))
await httpService.post('/upload', formData)

// 5. Blob upload
const blob = new Blob(['content'], { type: 'text/plain' })
await httpService.post('/upload/text', blob)

// 6. PUT/PATCH also work with files
await httpService.put('/users/123/avatar', file)
await httpService.patch('/documents/456', { 
  title: 'Updated Title',
  attachment: newFile 
})

// 7. Regular JSON (no files) - works normally
await httpService.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
}) // Sends as application/json
```

### **Dedicated Upload Methods (Optional)**
```typescript
// If you prefer explicit upload methods, these are still available:

// Single file with progress
const response = await httpService.upload('/upload', file, (progress) => {
  console.log(`Upload progress: ${progress}%`)
})

// Multiple files
const files = Array.from(document.getElementById('filesInput').files)
const response = await httpService.uploadMultiple('/upload/multiple', files)

// File with additional data
const response = await httpService.uploadWithData('/upload', file, {
  title: 'My Document',
  category: 'work'
})
```

### **Using API Services**
```typescript
import { userApiService, authApiService, productApiService } from '@/app/services'

// Authentication
const authResponse = await authApiService.login({
  email: 'user@example.com',
  password: 'password'
})

// Get users with pagination
const usersResponse = await userApiService.getUsers({
  page: 1,
  limit: 10,
  search: 'john'
})

// Update user
const updatedUser = await userApiService.updateUser(userId, {
  name: 'New Name',
  status: 'Active'
})

// Product operations
const productsResponse = await productApiService.getProducts({
  page: 1,
  limit: 20,
  category: 'electronics'
})

// Create product
const newProduct = await productApiService.createProduct({
  name: 'iPhone 15',
  description: 'Latest iPhone model',
  price: 999,
  category: 'smartphones',
  stock: 50
})
```

## ⚙️ Configuration

### **Environment Variables**
```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.yourapp.com/v1
```

### **Default Configuration**
```typescript
const defaultConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000, // 10 seconds
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}
```

### **Custom Configuration**
```typescript
import { HttpService } from '@/app/services'

const customHttpService = new HttpService({
  baseURL: 'https://api.custom.com',
  timeout: 5000,
  headers: {
    'Custom-Header': 'value'
  }
})
```

## 🔧 Advanced Features

### **Custom Interceptors**
```typescript
import { httpService } from '@/app/services'

// Add request interceptor
const requestId = httpService.addRequestInterceptor({
  onFulfilled: (config) => {
    // Add custom headers
    config.headers['X-Request-ID'] = generateRequestId()
    return config
  },
  onRejected: (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
})

// Add response interceptor
const responseId = httpService.addResponseInterceptor({
  onFulfilled: (response) => {
    // Process response data
    return response
  },
  onRejected: (error) => {
    // Handle specific errors
    return Promise.reject(error)
  }
})

// Remove interceptors
httpService.removeInterceptor('request', requestId)
httpService.removeInterceptor('response', responseId)
```

### **Error Handling**
The service automatically handles common HTTP errors:

- **401 Unauthorized**: Clears auth token and redirects to login
- **403 Forbidden**: Logs permission error
- **404 Not Found**: Logs resource error
- **422 Validation Error**: Logs validation details
- **500 Server Error**: Logs server error
- **Network Errors**: Handles connection issues

### **Response Format**
All responses follow the `ApiResponse<T>` format:
```typescript
interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}
```

## 🧪 Integration with Redux

```typescript
// In your Redux async thunks
import { userApiService, productApiService } from '@/app/services'

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await userApiService.getUsers(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await productApiService.getProducts(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
```

## 🔒 Security Features

- **Automatic token management**: Tokens stored securely in localStorage
- **Request signing**: Automatic Authorization header injection
- **CSRF protection**: Configurable CSRF token handling
- **Timeout protection**: Prevents hanging requests
- **Error logging**: Security-conscious error handling

## 📝 Best Practices

1. **Use API Services**: Create specific API service classes for different domains
2. **Error Handling**: Always handle errors in your components/Redux
3. **Type Safety**: Use TypeScript generics for type-safe responses
4. **Environment Config**: Use environment variables for API URLs
5. **Token Management**: Let the service handle authentication automatically
6. **Logging**: Use development logging for debugging

## 🚀 Creating New API Services

```typescript
// Create a new API service in app/services/httpServices/
// File: app/services/httpServices/categoryApiService.ts

import { httpService } from '@/app/services'
import { ApiResponse } from '@/app/types/common'

interface Category {
  id: number
  name: string
  description: string
  parentId?: number
  isActive: boolean
}

export class CategoryApiService {
  private readonly baseEndpoint = '/categories'

  async getCategories(): Promise<ApiResponse<Category[]>> {
    return httpService.get<Category[]>(this.baseEndpoint)
  }

  async createCategory(category: Omit<Category, 'id'>): Promise<ApiResponse<Category>> {
    return httpService.post<Category>(this.baseEndpoint, category)
  }
}

export const categoryApiService = new CategoryApiService()

// Then export it in app/services/httpServices/index.ts
export { categoryApiService, CategoryApiService } from './categoryApiService'
export * from './categoryApiService'
```