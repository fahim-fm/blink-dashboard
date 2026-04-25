import { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { ApiResponse } from '@/app/types/common'

export async function get<T = any>(
  instance: AxiosInstance,
  formatError: (error: AxiosError) => Error,
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await instance.get<ApiResponse<T>>(url, config)
    return response.data
  } catch (error) {
    throw formatError(error as AxiosError)
  }
}