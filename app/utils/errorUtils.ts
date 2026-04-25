import { AxiosError } from 'axios'

export function formatError(error: AxiosError): Error {
  const data = error.response?.data as any
  const message = data?.message || data?.error || `HTTP ${error.response?.status} Error`
  return new Error(message)
}