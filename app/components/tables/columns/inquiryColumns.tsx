// columns/inquiryColumns.tsx
import React from 'react'
import { Inquiry } from '@/app/types/inquiry'
import { formatDateTime } from '@/app/utils'
import Badge from '../../ui/Badge'
export const inquiryColumns = (
 
) => [
  {
    key: 'inquiryTime',
    header: 'Inquiry Time',
    render: (row: Inquiry) => formatDateTime(row.inquiryTime),
  },
  {
    key: 'contactEmail',
    header: 'Contact Email',
  },
  {
    key: 'title',
    header: 'Inquiry Title',
  },
  {
    key: 'status',
    header: 'Status',
   render: (row: Inquiry) => <Badge status={row.status} />
,
  },
]

