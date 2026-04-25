import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Inquiry, InquiryStatus } from '@/app/types/inquiry';
import { inquiriesData } from '@/app/data';

const baseEndpoint = '/inquiries';

export const inquiryService = {
  getInquiries: () => Promise.resolve([...inquiriesData]),
  getInquiryById: (id: string) =>
    Promise.resolve(inquiriesData.find(i => i.id === id) as Inquiry),
  updateInquiryStatus: (id: string, status: InquiryStatus) => {
    const inquiry = inquiriesData.find(i => i.id === id);
    if (inquiry) inquiry.status = status;
    return Promise.resolve({ id, status });
  },
  bulkUpdateInquiryStatus: (ids: string[], status: InquiryStatus) => {
    ids.forEach(id => {
      const inquiry = inquiriesData.find(i => i.id === id);
      if (inquiry) inquiry.status = status;
    });
    return Promise.resolve({ updatedIds: ids, status });
  },
};

export const fetchInquiries = createAsyncThunk('inquiry/fetchInquiries', async (_, { rejectWithValue }) => {
  try {
    await new Promise(res => setTimeout(res, 1000)); // simulate network delay
    return [...inquiriesData];
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to fetch inquiries');
  }
});

export const updateInquiryStatus = createAsyncThunk(
  'inquiry/updateInquiryStatus',
  async ({ id, status }: { id: string; status: InquiryStatus }, { rejectWithValue }) => {
    try {
      return await inquiryService.updateInquiryStatus(id, status);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update status');
    }
  }
);

export const bulkUpdateInquiryStatus = createAsyncThunk(
  'inquiry/bulkUpdateInquiryStatus',
  async ({ ids, status }: { ids: string[]; status: InquiryStatus }, { rejectWithValue }) => {
    try {
      return await inquiryService.bulkUpdateInquiryStatus(ids, status);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update status');
    }
  }
);
