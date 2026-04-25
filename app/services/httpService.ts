import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { HttpServiceConfig, ApiResponse } from '@/app/types'
import { formatError, TokenManager, ServerUtils } from '@/app/utils'
import { 
  setupRequestInterceptor, 
  setupResponseInterceptor
} from './interceptors'
import { get, post, put, patch, delete as del } from './httpMethods'

const defaultConfig: HttpServiceConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}

class HttpService {
  private instance: AxiosInstance
  private tokenManager: TokenManager
  private isClient: boolean

  constructor(config: HttpServiceConfig = {}) {
    this.isClient = typeof window !== 'undefined'
    this.instance = axios.create({ ...defaultConfig, ...config })
    this.tokenManager = new TokenManager()
    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    setupRequestInterceptor(this.instance, this.tokenManager.getToken.bind(this.tokenManager), this.isClient)
    setupResponseInterceptor(this.instance, this.isClient, formatError, this.tokenManager.clearToken.bind(this.tokenManager))
  }

  setToken(token: string): void {
    this.tokenManager.setToken(token)
  }

  clearToken(): void {
    this.tokenManager.clearToken()
  }

  getToken(): string | null {
    return this.tokenManager.getToken()
  }

  getInstance(): AxiosInstance {
    return this.instance
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return get<T>(this.instance, formatError, url, config)
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return post<T>(this.instance, formatError, this.isClient, url, data, config)
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return put<T>(this.instance, formatError, this.isClient, url, data, config)
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return patch<T>(this.instance, formatError, this.isClient, url, data, config)
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return del<T>(this.instance, formatError, url, config)
  }

  setServerToken(token: string): void {
    this.setToken(token)
  }

  static withToken(token: string, config?: HttpServiceConfig): HttpService {
    return ServerUtils.withToken(token, config, HttpService)
  }

  static fromHeaders(headers: Headers, config?: HttpServiceConfig): HttpService {
    return ServerUtils.fromHeaders(headers, config, HttpService)
  }

  static fromCookies(cookies: any, tokenKey = 'auth_token', config?: HttpServiceConfig): HttpService {
    return ServerUtils.fromCookies(cookies, tokenKey, config, HttpService)
  }
}

const httpService = new HttpService()

export default httpService
export { HttpService }