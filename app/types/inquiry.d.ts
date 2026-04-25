export type InquiryStatus = 'pending' | 'complete'

export interface ChatMessage {
  sender: 'admin' | 'user'
  message: string
  timestamp: string
}

export interface Inquiry {
  id: string
  title: string
  contactEmail: string
  inquiryTime: string
  status: InquiryStatus
  resolvedTime: string | null

  userName: string
  userId: string
  phone?: string
  messages: ChatMessage[]
}

export interface InquiryFilters {
  search: string
  status: 'All' | InquiryStatus
  sortBy: 'inquiryTime' | 'status' | 'title'
  sortOrder: 'asc' | 'desc'
}

export interface InquiryState {
  inquiries: Inquiry[]
  filteredInquiries: Inquiry[]
  filters: InquiryFilters
  inquiriesLoading: boolean
  inquiriesError: string | null
  currentPage: number
  inquiriesPerPage: number
  selectedInquiries: string[]
}
