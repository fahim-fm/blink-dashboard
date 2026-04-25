import React from 'react'
import Image from 'next/image'
import { Button } from '@/app/components'
import {
  User,
  Clock,
  Flag,
  Multiplication,
  Cross,
} from '@/app/utils/image/icon.image'
import { RegisterDetailsList } from './RegisterDetailsList'
import { Report } from '@/app/types/report'
import { X } from 'lucide-react'

type ReportDetailsProps = {
  isOpen: boolean
  report: Report
  onClose: () => void
  onConfirm?: () => void
}

export const ReportDetails: React.FC<ReportDetailsProps> = ({
  isOpen,
  report,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-form w-full max-w-[644px] rounded-[24px] p-[20px] shadow-lg relative">
        {/* Header */}
        <div className="mb-6">
          <h3 className="font-extrabold text-[20px] text-text mb-2">
            Report Details
          </h3>
          <p className="text-text-muted font-medium text-[16px]">
            This is the full details for the selected report
          </p>
        </div>

        {/* Details */}
        <div className="mt-[24px] max-w-[604px] grid grid-cols-2 gap-6">
          <RegisterDetailsList
            User={User}
            title="Reported By"
            name={report.reportedBy}
          />

          <RegisterDetailsList
            User={User}
            title="Reported User"
            name={report.reportedUser}
          />

          <RegisterDetailsList
            User={Clock}
            title="Reported At"
            name={new Date(report.reportedAt).toLocaleString()}
          />

          <RegisterDetailsList
            User={Flag}
            title="Category"
            name={report.category}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-[24px]">
          <Button
            leftIcon={
           <X  size={20} className='text-text-secondary'></X>
            }
            variant="reject"
            size="rejectBtnSize"
            className="bg-border  !text-text-secondary"
            onClick={onClose}
          >
            Reject Report
          </Button>

          <Button
            leftIcon={
              <Image src={Cross} alt="Block" width={20} height={20} />
            }
            variant="reject"
            size="rejectBtnSize"
            className="bg-red  text-white"
            onClick={onConfirm}
          >
            Block User
          </Button>
        </div>
      </div>
    </div>
  )
}
