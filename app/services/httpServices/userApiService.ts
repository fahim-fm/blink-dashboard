import { createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '@/app/services/httpService'
import type { User, GetUsersParams } from '@/app/types/user'
import type { PaginatedResponse } from '@/app/types/common'
import { usersData } from '@/app/data/user/usersData';

const baseEndpoint = '/users';

export const userService = {
  getUsers: (params?: GetUsersParams) => httpService.get<PaginatedResponse<User>>(`${baseEndpoint}`, { params }),
  getUserById: (id: number) => httpService.get<User>(`${baseEndpoint}/${id}`),
  createUser: (userData: Omit<User, 'id' | 'createdAt'>) => httpService.post<User>(`${baseEndpoint}`, userData),
  updateUser: (id: number, userData: Partial<User>) => httpService.put<User>(`${baseEndpoint}/${id}`, userData),
  deleteUser: (id: number) => httpService.delete<null>(`${baseEndpoint}/${id}`),
  updateUserStatus: (id: number, status: 'Active' | 'Blocked') => httpService.patch<User>(`${baseEndpoint}/${id}/status`, { status }),
  bulkDeleteUsers: (userIds: number[]) => httpService.delete<null>(`${baseEndpoint}/bulk`, { data: { userIds } }),
  searchUsers: (query: string) => httpService.get<User[]>(`${baseEndpoint}/search`, { params: { q: query } }),
}

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (params: GetUsersParams | undefined, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock data - replace with actual API call
      const users: User[] = usersData
      
      return users
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch users')
    }
  }
)

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await userService.getUserById(id)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const createUser = createAsyncThunk<User, Omit<User, 'id' | 'createdAt'>>(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      // simulate network delay
      await new Promise(res => setTimeout(res, 800))

      // MOCK: generate a new id and createdAt
      const newUser: User = {
        id: usersData.length + 1,
        createdAt: new Date().toISOString(),
        ...userData,
        status: 'Active', // default status
       
      }

      // Push to mock users array
      usersData.push(newUser)

      return newUser
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to create user')
    }
  }
)
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, userData }: { id: number; userData: Partial<User> }, { rejectWithValue }) => {
    try {
      return await userService.updateUser(id, userData)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      return id
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete user')
    }
  }
)

export const updateUserStatus = createAsyncThunk<
  { userId: number; status: 'Active' | 'Blocked' }, //  RETURN TYPE
  { id: number; status: 'Active' | 'Blocked' }      //  ARGUMENT TYPE
>(
  'user/updateUserStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      // simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

     
      return { userId: id, status }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update user status')
    }
  }
)
export const bulkUpdateUserStatus = createAsyncThunk<
  { updatedIds: number[]; status: 'Active' | 'Blocked' },
  { ids: number[]; status: 'Active' | 'Blocked' }
>(
  'user/bulkUpdateUserStatus',
  async ({ ids, status }, { rejectWithValue }) => {
    try {
      // simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))

      // In production, replace this with real API call
      // await userService.bulkUpdateStatus(ids, status)

      return { updatedIds: ids, status }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update user status')
    }
  }
)

export const bulkDeleteUsers = createAsyncThunk(
  'user/bulkDeleteUsers',
  async (userIds: number[], { rejectWithValue }) => {
    try {
      return await userService.bulkDeleteUsers(userIds)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const searchUsers = createAsyncThunk(
  'user/searchUsers',
  async (query: string, { rejectWithValue }) => {
    try {
      return await userService.searchUsers(query)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)