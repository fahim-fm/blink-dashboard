import { AxiosInstance, AxiosError } from 'axios'

export function setupRequestInterceptor(
  instance: AxiosInstance,
  getToken: () => string | null,
  isClient: boolean
): void {
  instance.interceptors.request.use(
    (config) => {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      if (config.method === 'get') {
        config.params = { ...config.params, _t: Date.now() }
      }
      if (process.env.NODE_ENV === 'development' && isClient) {
        console.log(`🚀 [${config.method?.toUpperCase()}] ${config.url}`)
      }
      return config
    },
    (error) => Promise.reject(error)
  )
}