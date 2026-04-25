import { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { ApiResponse } from '@/app/types/common'
import { isFileUpload, prepareUploadData } from '@/app/utils'

export async function patch<T = any>(
  instance: AxiosInstance,
  formatError: (error: AxiosError) => Error,
  isClient: boolean,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    let requestData = data
    let requestConfig = { ...config }

    if (isClient && isFileUpload(data)) {
      const { uploadData, headers } = prepareUploadData(data)
      requestData = uploadData
      requestConfig.headers = {
        ...headers,
        ...config?.headers,
      }
    }

    const response = await instance.patch<ApiResponse<T>>(url, requestData, requestConfig)
    return response.data
  } catch (error) {
    throw formatError(error as AxiosError)
  }
}