import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from '@/app/redux/slices/userSlice'
import { dashboardSlice } from '@/app/redux/slices/dashboardSlice'
import {reportSlice} from '@/app/redux/slices/reportSlice'
import {inquirySlice} from '@/app/redux/slices/inquirySlice'


export const rootReducer = combineReducers({
  user: userSlice.reducer,
  dashboard: dashboardSlice.reducer,
  report: reportSlice.reducer,
  inquiry:inquirySlice.reducer
  
})

export type RootState = ReturnType<typeof rootReducer>