// Redux-related type definitions

import type { store } from '@/app/redux/store'

// Redux store types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Redux action types
export interface AsyncThunkConfig {
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
}

// Redux slice state types
export interface SliceState {
  loading: boolean
  error: string | null
}

// Action payload types
export interface UpdatePayload<T> {
  id: string | number
  data: Partial<T>
}

export interface DeletePayload {
  id: string | number
}

export interface BulkActionPayload {
  ids: Array<string | number>
  action: string
}