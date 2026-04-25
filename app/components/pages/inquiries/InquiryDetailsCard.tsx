import React from 'react'
import Badge from '../../ui/Badge'
import type { Inquiry } from '@/app/types/inquiry'
import { formatDateTime } from '@/app/utils'

interface InquiryDetailsCardProps {
  inquiry: Inquiry
}

const InquiryDetailsCard: React.FC<InquiryDetailsCardProps> = ({ inquiry }) => {
  return (
    <div className="bg-form p-5 h-fit rounded-[32px] w-full shrink-0 lg:max-w-[352px] flex flex-col gap-6">
      {/* Contact Email */}
      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-[16px] text-text-muted">
          Contact Email
        </h4>
        <h2 className="font-semibold text-[18px] text-text-secondary">
          {inquiry.contactEmail}
        </h2>
      </div>

      {/* Inquiry Time */}
      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-[16px] text-text-muted">
          Inquiry Time
        </h4>
        <h2 className="font-semibold text-[18px] text-text-secondary">
          {formatDateTime(inquiry.inquiryTime)}
        </h2>
      </div>

      {/* Inquiry Status */}
      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-[16px] text-text-muted">
          Inquiry Status
        </h4>
        <Badge status={inquiry.status} className="w-fit" />
      </div>

      {/* Inquiry Resolved Time */}
      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-[16px] text-text-muted">
          Inquiry Resolved Time
        </h4>
        <h2 className="font-semibold text-[18px] text-text-secondary">
          {inquiry.resolvedTime
            ? formatDateTime(inquiry.resolvedTime)
            : 'N/A'}
        </h2>
      </div>
    </div>
  )
}

export default InquiryDetailsCard
