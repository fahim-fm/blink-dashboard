import { createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '@/app/services/httpService'
import type { User, LoginCredentials, RegisterData, AuthResponse } from '@/app/types/user'

const baseEndpoint = '/auth';

export const authService = {
  login: (credentials: LoginCredentials) => httpService.post<AuthResponse>(`${baseEndpoint}/login`, credentials),
  register: (userData: RegisterData) => httpService.post<AuthResponse>(`${baseEndpoint}/register`, userData),
  logout: () => httpService.post<null>(`${baseEndpoint}/logout`),
  refreshToken: () => httpService.post<{ token: string }>(`${baseEndpoint}/refresh`),
  getCurrentUser: () => httpService.get<User>(`${baseEndpoint}/me`),
  updateProfile: (userData: Partial<User>) => httpService.put<User>(`${baseEndpoint}/profile`, userData),
  changePassword: (data: { currentPassword: string; newPassword: string }) => httpService.post<null>(`${baseEndpoint}/change-password`, data),
  forgotPassword: (email: string) => httpService.post<null>(`${baseEndpoint}/forgot-password`, { email }),
  resetPassword: (data: { token: string; password: string }) => httpService.post<null>(`${baseEndpoint}/reset-password`, data),
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials)
      if (response.data?.token) {
        httpService.setToken(response.data.token)
      }
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData)
      if (response.data?.token) {
        httpService.setToken(response.data.token)
      }
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.logout()
      httpService.clearToken()
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const refreshAuthToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken()
      if (response.data?.token) {
        httpService.setToken(response.data.token)
      }
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getCurrentUser()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      return await authService.updateProfile(userData)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const changeUserPassword = createAsyncThunk(
  'auth/changePassword',
  async (data: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
    try {
      return await authService.changePassword(data)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const sendForgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      return await authService.forgotPassword(email)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const resetUserPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: { token: string; password: string }, { rejectWithValue }) => {
    try {
      return await authService.resetPassword(data)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)