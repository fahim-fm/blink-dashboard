# Server Component HTTP Service Usage

This guide shows how to use the HTTP service safely in Next.js server components.

## 🔧 **Server Components**

### **Using ServerHttpService**

```typescript
// app/users/page.tsx (Server Component)
import { ServerHttpService } from '@/app/services'
import { headers, cookies } from 'next/headers'

export default async function UsersPage() {
  // Method 1: From headers
  const headersList = headers()
  const serverHttp = ServerHttpService.fromHeaders(headersList)
  
  // Method 2: From cookies
  const cookieStore = cookies()
  const serverHttp = ServerHttpService.fromCookies(cookieStore)
  
  // Method 3: With specific token
  const token = 'your-server-token'
  const serverHttp = ServerHttpService.withToken(token)
  
  try {
    const users = await serverHttp.get('/users')
    return (
      <div>
        <h1>Users</h1>
        {users.data.map(user => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    )
  } catch (error) {
    return <div>Error loading users</div>
  }
}
```

### **API Routes (Server-side)**

```typescript
// app/api/users/route.ts
import { ServerHttpService } from '@/app/services'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Get token from request headers
  const serverHttp = ServerHttpService.fromHeaders(request.headers)
  
  try {
    const users = await serverHttp.get('/external-api/users')
    return Response.json(users)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
```

## 🎯 **Client Components**

### **Using Regular HttpService**

```typescript
'use client'
import { httpService } from '@/app/services'
import { useEffect, useState } from 'react'

export default function UsersList() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await httpService.get('/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    
    fetchUsers()
  }, [])
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

## 🔒 **Authentication Patterns**

### **Server-side Token Handling**

```typescript
// Middleware or server component
import { ServerHttpService } from '@/app/services'
import { cookies } from 'next/headers'

async function getAuthenticatedData() {
  const cookieStore = cookies()
  const token = cookieStore.get('auth_token')?.value
  
  if (!token) {
    throw new Error('Not authenticated')
  }
  
  const serverHttp = ServerHttpService.withToken(token)
  return await serverHttp.get('/protected-data')
}
```

### **Client-side Token Management**

```typescript
'use client'
import { httpService } from '@/app/services'

// Login and set token
async function login(credentials) {
  const response = await httpService.post('/auth/login', credentials)
  
  // Token is automatically saved to localStorage
  httpService.setToken(response.data.token)
  
  return response
}

// Token is automatically loaded from localStorage on page refresh
```

## ⚡ **Performance Tips**

1. **Server Components**: Use `ServerHttpService` for data fetching during SSR
2. **Client Components**: Use regular `httpService` for interactive features
3. **API Routes**: Use `ServerHttpService` for server-to-server communication
4. **Middleware**: Use `ServerHttpService.fromHeaders()` for request processing

## 🛠 **Error Handling**

```typescript
// Server Component
try {
  const data = await serverHttp.get('/api/data')
  return <SuccessComponent data={data} />
} catch (error) {
  // Handle gracefully in server components
  return <ErrorComponent message="Failed to load data" />
}

// Client Component
try {
  const data = await httpService.get('/api/data')
  setData(data)
} catch (error) {
  // Handle with state management
  setError(error.message)
}
```

## 🔄 **Hybrid Usage**

```typescript
// Server component fetches initial data
async function ServerUserList() {
  const serverHttp = ServerHttpService.fromCookies(cookies())
  const initialUsers = await serverHttp.get('/users')
  
  return <ClientUserList initialData={initialUsers.data} />
}

// Client component handles interactions
'use client'
function ClientUserList({ initialData }) {
  const [users, setUsers] = useState(initialData)
  
  const refreshUsers = async () => {
    const response = await httpService.get('/users')
    setUsers(response.data)
  }
  
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
      <button onClick={refreshUsers}>Refresh</button>
    </div>
  )
}
```