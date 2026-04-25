import { AxiosInstance, AxiosError } from 'axios'

export function setupResponseInterceptor(
  instance: AxiosInstance,
  isClient: boolean,
  formatError: (error: AxiosError) => Error,
  clearToken: () => void
): void {
  instance.interceptors.response.use(
    (response) => {
      if (process.env.NODE_ENV === 'development' && isClient) {
        console.log(`✅ [${response.status}] ${response.config.url}`)
      }
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        clearToken()
        if (isClient) {
          window.location.href = '/login'
        }
      }
      return Promise.reject(formatError(error))
    }
  )
}