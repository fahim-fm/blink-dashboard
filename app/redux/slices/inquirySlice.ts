import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { InquiryState, InquiryStatus } from '@/app/types/inquiry'
import {
  fetchInquiries,
  updateInquiryStatus,
  bulkUpdateInquiryStatus,
} from '@/app/services'
import { applyInquiryFilters } from '@/app/utils/inquiryFilters'

const initialState: InquiryState = {
  inquiries: [],
  filteredInquiries: [],
  filters: {
    search: '',
    status: 'All',
    sortBy: 'inquiryTime',
    sortOrder: 'asc',
  },
  inquiriesLoading: false,
  inquiriesError: null,
  currentPage: 1,
  inquiriesPerPage: 10,
  selectedInquiries: [],
}

export const inquirySlice = createSlice({
  name: 'inquiry',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      state.filteredInquiries = applyInquiryFilters(
        state.inquiries,
        state.filters
      )
      state.currentPage = 1
    },

    setStatusFilter: (
      state,
      action: PayloadAction<'All' | InquiryStatus>
    ) => {
      state.filters.status = action.payload
      state.filteredInquiries = applyInquiryFilters(
        state.inquiries,
        state.filters
      )
      state.currentPage = 1
    },

    setSorting: (
      state,
      action: PayloadAction<{
        sortBy: 'inquiryTime' | 'status' | 'title'
        sortOrder: 'asc' | 'desc'
      }>
    ) => {
      state.filters.sortBy = action.payload.sortBy
      state.filters.sortOrder = action.payload.sortOrder
      state.filteredInquiries = applyInquiryFilters(
        state.inquiries,
        state.filters
      )
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },

    toggleInquirySelection: (state, action: PayloadAction<string>) => {
      const id = action.payload
      if (state.selectedInquiries.includes(id)) {
        state.selectedInquiries = state.selectedInquiries.filter(
          i => i !== id
        )
      } else {
        state.selectedInquiries.push(id)
      }
    },

    clearSelection: state => {
      state.selectedInquiries = []
    },

    selectAllInquiries: state => {
      state.selectedInquiries = state.filteredInquiries.map(i => i.id)
    },

    clearInquiriesError: state => {
      state.inquiriesError = null
    },

    // ✅ NEW: Add message (admin or user)
    addInquiryMessage: (
      state,
      action: PayloadAction<{
        inquiryId: string
        sender: 'admin' | 'user'
        message: string
      }>
    ) => {
      const { inquiryId, sender, message } = action.payload

      const inquiry = state.inquiries.find(i => i.id === inquiryId)
      if (!inquiry) return

      inquiry.messages.push({
        sender,
        message,
        timestamp: new Date().toISOString(),
      })

      // Keep filtered list in sync
      state.filteredInquiries = applyInquiryFilters(
        state.inquiries,
        state.filters
      )
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchInquiries.pending, state => {
        state.inquiriesLoading = true
        state.inquiriesError = null
      })

      .addCase(fetchInquiries.fulfilled, (state, action) => {
        state.inquiriesLoading = false
        state.inquiries = action.payload
        state.filteredInquiries = applyInquiryFilters(
          action.payload,
          state.filters
        )
      })

      .addCase(fetchInquiries.rejected, (state, action) => {
        state.inquiriesLoading = false
        state.inquiriesError = action.payload as string
      })

      .addCase(updateInquiryStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload
        const inquiry = state.inquiries.find(i => i.id === id)
        if (inquiry) inquiry.status = status

        state.filteredInquiries = applyInquiryFilters(
          state.inquiries,
          state.filters
        )
      })

      .addCase(bulkUpdateInquiryStatus.fulfilled, (state, action) => {
        const { updatedIds, status } = action.payload

        updatedIds.forEach(id => {
          const inquiry = state.inquiries.find(i => i.id === id)
          if (inquiry) inquiry.status = status
        })

        state.filteredInquiries = applyInquiryFilters(
          state.inquiries,
          state.filters
        )

        state.selectedInquiries = state.selectedInquiries.filter(
          id => !updatedIds.includes(id)
        )
      })
  },
})

export const {
  setSearch,
  setStatusFilter,
  setSorting,
  setCurrentPage,
  toggleInquirySelection,
  clearSelection,
  selectAllInquiries,
  clearInquiriesError,
  addInquiryMessage, // ✅ export
} = inquirySlice.actions

export default inquirySlice.reducer
