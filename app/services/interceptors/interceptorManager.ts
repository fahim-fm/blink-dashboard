import { AxiosInstance } from 'axios'
import { RequestInterceptor, ResponseInterceptor } from '@/app/types'

export function addRequestInterceptor(instance: AxiosInstance, interceptor: RequestInterceptor): number {
  return instance.interceptors.request.use(
    interceptor.onFulfilled,
    interceptor.onRejected
  )
}

export function addResponseInterceptor(instance: AxiosInstance, interceptor: ResponseInterceptor): number {
  return instance.interceptors.response.use(
    interceptor.onFulfilled,
    interceptor.onRejected
  )
}

export function removeInterceptor(instance: AxiosInstance, type: 'request' | 'response', id: number): void {
  instance.interceptors[type].eject(id)
}