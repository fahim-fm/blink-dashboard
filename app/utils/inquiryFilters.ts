import type { Inquiry, InquiryFilters } from '@/app/types/inquiry';

export const applyInquiryFilters = (inquiries: Inquiry[], filters: InquiryFilters): Inquiry[] => {
  let filtered = [...inquiries];

  // Search filter
  if (filters.search) {
    filtered = filtered.filter(
      i =>
        i.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        i.contactEmail.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  // Status filter
  if (filters.status !== 'All') {
    filtered = filtered.filter(i => i.status === filters.status);
  }

  // Sort
  filtered.sort((a, b) => {
    const aValue = a[filters.sortBy as keyof Inquiry] ?? '';
    const bValue = b[filters.sortBy as keyof Inquiry] ?? '';

    if (filters.sortOrder === 'asc') return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    else return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
  });

  return filtered;
};
